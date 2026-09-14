#!/usr/bin/env python3
# die-temperatures — EVERY TEMPERATURE SENSOR THE CHIP EXPOSES, read-only, as JSON (the captain, 2026-09-14: "all device
# data as evidence", "not a single temperature reading … at the core of the chip"). On Apple silicon the die sensors are
# reachable only through the IOHIDEventSystem sensor API — no built-in command reads them — so this calls it directly
# through ctypes: no compiler, no root, nothing written. Each reading is the sensor's own name and value; nothing is
# computed, smoothed or chosen. Called by src/scripts/device-readings.ts; a host without the API prints an empty list.
import ctypes, ctypes.util, json, sys

def read():
    cf = ctypes.CDLL(ctypes.util.find_library('CoreFoundation'))
    io = ctypes.CDLL(ctypes.util.find_library('IOKit'))
    V = ctypes.c_void_p
    cf.CFNumberCreate.restype = V; cf.CFNumberCreate.argtypes = [V, ctypes.c_int, V]
    cf.CFStringCreateWithCString.restype = V; cf.CFStringCreateWithCString.argtypes = [V, ctypes.c_char_p, ctypes.c_uint32]
    cf.CFDictionaryCreate.restype = V; cf.CFDictionaryCreate.argtypes = [V, ctypes.POINTER(V), ctypes.POINTER(V), ctypes.c_long, V, V]
    cf.CFArrayGetCount.restype = ctypes.c_long; cf.CFArrayGetCount.argtypes = [V]
    cf.CFArrayGetValueAtIndex.restype = V; cf.CFArrayGetValueAtIndex.argtypes = [V, ctypes.c_long]
    cf.CFStringGetCString.restype = ctypes.c_bool; cf.CFStringGetCString.argtypes = [V, ctypes.c_char_p, ctypes.c_long, ctypes.c_uint32]
    io.IOHIDEventSystemClientCreate.restype = V; io.IOHIDEventSystemClientCreate.argtypes = [V]
    io.IOHIDEventSystemClientSetMatching.restype = ctypes.c_int; io.IOHIDEventSystemClientSetMatching.argtypes = [V, V]
    io.IOHIDEventSystemClientCopyServices.restype = V; io.IOHIDEventSystemClientCopyServices.argtypes = [V]
    io.IOHIDServiceClientCopyProperty.restype = V; io.IOHIDServiceClientCopyProperty.argtypes = [V, V]
    io.IOHIDServiceClientCopyEvent.restype = V; io.IOHIDServiceClientCopyEvent.argtypes = [V, ctypes.c_int64, ctypes.c_int32, ctypes.c_int64]
    io.IOHIDEventGetFloatValue.restype = ctypes.c_double; io.IOHIDEventGetFloatValue.argtypes = [V, ctypes.c_int32]
    utf8, cf_int, temperature = 0x08000100, 9, 15
    s = lambda t: cf.CFStringCreateWithCString(None, t.encode(), utf8)
    page, usage = ctypes.c_int(0xff00), ctypes.c_int(5)
    keys = (V * 2)(s('PrimaryUsagePage'), s('PrimaryUsage'))
    vals = (V * 2)(cf.CFNumberCreate(None, cf_int, ctypes.byref(page)), cf.CFNumberCreate(None, cf_int, ctypes.byref(usage)))
    kcb = V.in_dll(cf, 'kCFTypeDictionaryKeyCallBacks'); vcb = V.in_dll(cf, 'kCFTypeDictionaryValueCallBacks')
    match = cf.CFDictionaryCreate(None, keys, vals, 2, ctypes.addressof(kcb), ctypes.addressof(vcb))
    client = io.IOHIDEventSystemClientCreate(None)
    if not client: return []
    io.IOHIDEventSystemClientSetMatching(client, match)
    services = io.IOHIDEventSystemClientCopyServices(client)
    rows = []
    for i in range(cf.CFArrayGetCount(services) if services else 0):
        svc = cf.CFArrayGetValueAtIndex(services, i)
        ev = io.IOHIDServiceClientCopyEvent(svc, temperature, 0, 0)
        if not ev: continue
        name = io.IOHIDServiceClientCopyProperty(svc, s('Product'))
        buf = ctypes.create_string_buffer(128)
        sensor = buf.value.decode() if name and cf.CFStringGetCString(name, buf, 128, utf8) else 'unnamed'
        c = io.IOHIDEventGetFloatValue(ev, temperature << 16)
        rows.append({'sensor': sensor, 'celsius': round(c, 2), 'millikelvin': round((c + 273.15) * 1000)})
    return rows

try:
    print(json.dumps(read()))
except Exception as e:  # a host without the sensor API: an empty list and the reason, never a guessed value
    print(json.dumps({'error': str(e)}))
    sys.exit(0)
