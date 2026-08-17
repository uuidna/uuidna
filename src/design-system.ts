// src/design-system.ts — UNIFIED CAPTAIN COINS DESIGN SYSTEM
// UI + MCP + Navigation + Sidebars + Typography fused into coherent whole

import { typeScale, typeScaleVars } from './typography.js'

export const designSystem = {
  // ═══════════════════════════════════════════════════════════════════════════
  // FOUNDATION: Color System (Captain Coins Economy)
  // ═══════════════════════════════════════════════════════════════════════════

  colors: {
    // Primary: Theorem Proof (Mathematical certainty)
    primary: {
      50: '#f0f9ff',   // Lightest: untested hypothesis
      100: '#e0f2fe',  // Testing: work in progress
      200: '#bae6fd',  // Proven: theorem in ledger
      300: '#7dd3fc',  // Verified: both parties agree
      400: '#38bdf8',  // Active: live on mainnet
      500: '#0ea5e9',  // Core: captain coins blue
      600: '#0284c7',  // Emphasis: highlighted claim
      700: '#0369a1',  // Deep: archived theorems
      800: '#075985',  // Darkest: historical record
      900: '#0c2d48',  // Deepest: foundation
    },

    // Secondary: Contribution (Value created)
    secondary: {
      50: '#f0fdf4',   // Lightest: potential
      100: '#dcfce7',  // Testing: analyzing
      200: '#bbf7d0',  // Proven: theorems added
      300: '#86efac',  // Verified: system improved
      400: '#4ade80',  // Active: improvements live
      500: '#22c55e',  // Core: growth green
      600: '#16a34a',  // Emphasis: high impact
      700: '#15803d',  // Deep: locked achievements
      800: '#166534',  // Darkest: historical growth
      900: '#0f2818',  // Deepest: foundation
    },

    // Tertiary: Cost/Efficiency (System compaction)
    tertiary: {
      50: '#fef3c7',   // Lightest: inefficient
      100: '#fde68a',  // Testing: optimizing
      200: '#fcd34d',  // Proven: optimized
      300: '#fbbf24',  // Verified: highly compact
      400: '#f59e0b',  // Active: live optimization
      500: '#d97706',  // Core: efficiency amber
      600: '#b45309',  // Emphasis: critical compaction
      700: '#92400e',  // Deep: archived efficiency
      800: '#78350f',  // Darkest: foundation compaction
      900: '#451a03',  // Deepest: minimal code
    },

    // Neutral: UI Structure (Interface)
    neutral: {
      0: '#ffffff',    // Pure white (theorems, proofs)
      50: '#f9fafb',   // Off-white (ledger entries)
      100: '#f3f4f6',  // Light gray (backgrounds)
      200: '#e5e7eb',  // Gray (borders, dividers)
      300: '#d1d5db',  // Medium gray (secondary text)
      400: '#9ca3af',  // Gray (tertiary text)
      500: '#6b7280',  // Dark gray (body text)
      600: '#4b5563',  // Darker gray (emphasis)
      700: '#374151',  // Dark (headings)
      800: '#1f2937',  // Very dark (strong emphasis)
      900: '#111827',  // Almost black (highest contrast)
    },

    // Status: Truth/Lie Indicator
    status: {
      true: '#22c55e',   // Green: theorem proven, ✓
      false: '#ef4444',  // Red: contradiction found, ✗
      pending: '#f59e0b', // Amber: under verification
      unknown: '#6b7280', // Gray: not yet proven
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TYPOGRAPHY: Hierarchy (Theorems to Prose)
  // ═══════════════════════════════════════════════════════════════════════════

  // TYPOGRAPHY IS NOT AUTHORED HERE — it is the matrix. The ladder computes from the vortex orbit in src/css.ts
  // (six rungs, because 2 has order 6 in ℤ/9*; each rung a ninth above the base; line height in the sealed 3:4
  // rectangle) and is served to every surface by uuidna_css. Read the CSS variables, never a pixel literal.
  typography: {
    scale: typeScale(),            // [{digit, size, lineHeight}] — the six rungs, computed
    vars: typeScaleVars(),         // --type-<digit> / --type-lh-<digit>, the served names
    weights: { regular: 400, bold: 700 },
    mono: 'var(--vp-font-family-mono)',
  },
  components: {
    // Theorem Card: Display a single theorem
    theoremCard: {
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid',
      borderColor: 'neutral.200',
      backgroundColor: 'neutral.0',
      shadow: '0 1px 3px rgba(0,0,0,0.1)',
      // Rendered as: verified proof element
      //   Status: ✓ PROVEN
      //   Coins: 0.05
    },

    // Proof Display: Multi-line theorem with syntax highlighting
    proofDisplay: {
      fontFamily: 'code.display.fontFamily',
      backgroundColor: 'neutral.50',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid',
      borderColor: 'neutral.200',
      lineNumbers: true,
      syntaxHighlight: {
        keyword: 'primary.600',      // theorem, def, ∀
        identifier: 'neutral.900',   // theorem_name, proposition
        operator: 'secondary.500',   // :=, →, ∧
        comment: 'neutral.400',      // -- comment
        string: 'tertiary.600',      // "string"
      },
    },

    // Navigation Item: Sidebar navigation entry
    navItem: {
      padding: '12px 16px',
      borderRadius: '8px',
      gap: '8px',
      fontSize: '1rem'          // the base itself: 9/9 — the ladder ascends from it,
      fontWeight: '500',
      transitionDuration: '200ms',
      states: {
        default: {
          color: 'neutral.600',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
        hover: {
          backgroundColor: 'neutral.100',
          color: 'neutral.900',
        },
        active: {
          backgroundColor: 'primary.100',
          color: 'primary.700',
          borderLeft: '4px solid primary.500',
        },
        disabled: {
          color: 'neutral.300',
          cursor: 'not-allowed',
          opacity: '0.5',
        },
      },
    },

    // Sidebar: Left navigation panel
    sidebar: {
      width: '280px',
      backgroundColor: 'neutral.50',
      borderRight: '1px solid neutral.200',
      padding: '24px 16px',
      gap: '8px',
      maxHeight: '100vh',
      overflowY: 'auto',
      position: 'sticky',
      top: '0',
      // Contains: Logo, Nav items, Theorems count
    },

    // Badge: Status indicator (PROVEN, PENDING, etc.)
    badge: {
      padding: '4px 12px',
      borderRadius: '999px',
      fontSize: 'var(--type-1)' // the first rung of the computed ladder,
      fontWeight: 'label.sm.fontWeight',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      variants: {
        proven: {
          backgroundColor: 'secondary.100',
          color: 'secondary.700',
          icon: '✓',
        },
        pending: {
          backgroundColor: 'tertiary.100',
          color: 'tertiary.700',
          icon: '⏳',
        },
        failed: {
          backgroundColor: 'status.false' + '11', // With opacity
          color: 'status.false',
          icon: '✗',
        },
      },
    },

    // Button: Call-to-action (Verify, Sign, Approve)
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: 'var(--type-2)' // the second rung of the computed ladder,
      fontWeight: 'label.md.fontWeight',
      border: 'none',
      cursor: 'pointer',
      transitionDuration: '200ms',
      variants: {
        primary: {
          backgroundColor: 'primary.500',
          color: 'neutral.0',
          hover: { backgroundColor: 'primary.600' },
          active: { backgroundColor: 'primary.700' },
        },
        secondary: {
          backgroundColor: 'secondary.500',
          color: 'neutral.0',
          hover: { backgroundColor: 'secondary.600' },
          active: { backgroundColor: 'secondary.700' },
        },
        outline: {
          backgroundColor: 'transparent',
          color: 'primary.600',
          border: '1px solid primary.300',
          hover: { backgroundColor: 'primary.50' },
        },
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MCP NAVIGATION: Integrated command palette
  // ═══════════════════════════════════════════════════════════════════════════

  mcpNavigation: {
    // MCP Commands as navigation items
    commandPalette: {
      trigger: 'Cmd+K (Mac) / Ctrl+K (Windows)',
      placeholder: 'Search theorems, commands, or navigate...',
      categories: {
        theorems: {
          icon: '⟡',
          title: 'Theorems',
          commands: [
            'View all theorems',
            'Search theorems',
            'Verify theorem',
            'Export theorem',
          ],
        },
        navigation: {
          icon: '≡',
          title: 'Navigation',
          commands: [
            'Go to Dashboard',
            'Go to Ledger',
            'Go to Accounting',
            'Go to Settings',
          ],
        },
        actions: {
          icon: '→',
          title: 'Actions',
          commands: [
            'Sign agreement',
            'Verify proof',
            'Harmonise system',
            'Export theorems',
          ],
        },
        help: {
          icon: '?',
          title: 'Help',
          commands: [
            'Documentation',
            'Keyboard shortcuts',
            'About captain coins',
          ],
        },
      },
    },

    // MCP Sidebar integration
    sidebar: {
      sections: [
        {
          title: 'System',
          icon: '⚙',
          items: [
            { label: 'Dashboard', command: 'uuidna_dashboard' },
            { label: 'Ledger', command: 'uuidna_ledger' },
            { label: 'Theorems', command: 'uuidna_theorems_list' },
          ],
        },
        {
          title: 'Verification',
          icon: '✓',
          items: [
            { label: 'Verify Proofs', command: 'uuidna_verify_proofs' },
            { label: 'Check Status', command: 'uuidna_check_status' },
            { label: 'Audit System', command: 'uuidna_audit' },
          ],
        },
        {
          title: 'Economy',
          icon: '◆',
          items: [
            { label: 'Accounting', command: 'uuidna_accounting' },
            { label: 'Contributions', command: 'uuidna_contributions' },
            { label: 'Payment', command: 'uuidna_payment' },
          ],
        },
        {
          title: 'Operations',
          icon: '⟳',
          items: [
            { label: 'Harmonise', command: 'uuidna_harmonise' },
            { label: 'Analyse', command: 'uuidna_analyse' },
            { label: 'Export', command: 'uuidna_export' },
          ],
        },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAYOUT: Page structure (Navigation to Content)
  // ═════════════════════════════════════════════════════════════════════════════

  layout: {
    // Main layout: Sidebar + Content
    main: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '0',
      minHeight: '100vh',
      // Left: Sidebar (navigation)
      // Right: Content area
    },

    // Header: Top bar (Logo, Search, Account)
    header: {
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '0 24px',
      backgroundColor: 'neutral.0',
      borderBottom: '1px solid neutral.200',
      position: 'sticky',
      top: '0',
      zIndex: '100',
      items: {
        logo: { width: '32px', height: '32px' },
        search: { flex: '1', maxWidth: '400px' },
        account: { width: '40px', height: '40px' },
      },
    },

    // Content: Main work area
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px', // Main + Right sidebar
      gap: '24px',
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
    },

    // Right Sidebar: Properties/Details panel
    rightSidebar: {
      width: '320px',
      backgroundColor: 'neutral.50',
      borderLeft: '1px solid neutral.200',
      padding: '24px',
      maxHeight: 'calc(100vh - 64px)',
      overflowY: 'auto',
      position: 'sticky',
      top: '64px',
      // Shows: Theorem details, Status, Related items
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESPONSIVE: Mobile/Tablet adaptations
  // ═════════════════════════════════════════════════════════════════════════════

  responsive: {
    mobile: {
      // Hide left sidebar (use drawer/hamburger)
      layout: {
        gridTemplateColumns: '1fr',
      },
      // Stack right sidebar below content
      content: {
        gridTemplateColumns: '1fr',
      },
      // Reduce padding
      padding: '16px',
      // Stack navigation vertically
    },

    tablet: {
      // Show left sidebar, hide right sidebar
      layout: {
        gridTemplateColumns: '240px 1fr',
      },
      content: {
        gridTemplateColumns: '1fr',
      },
      rightSidebar: {
        display: 'none',
      },
    },

    desktop: {
      // Show both sidebars
      layout: {
        gridTemplateColumns: '280px 1fr',
      },
      content: {
        gridTemplateColumns: '1fr 320px',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCESSIBILITY: Semantic structure
  // ═════════════════════════════════════════════════════════════════════════════

  accessibility: {
    // Color contrast ratios (WCAG AA minimum)
    contrast: {
      largeText: '3:1',      // 14px+ or 18px+ bold
      normalText: '4.5:1',   // Default text
      UI: '3:1',             // UI components
    },

    // Focus indicators
    focus: {
      outline: '2px solid primary.500',
      outlineOffset: '2px',
    },

    // Reduced motion
    prefersReducedMotion: {
      transitionDuration: '0ms',
      animation: 'none',
    },

    // ARIA labels for interactive elements
    ariaLabels: {
      navItem: 'Navigation item: {label}',
      button: 'Button: {label}',
      badge: '{status} status badge',
      theoremCard: 'Theorem: {name}, Status: {status}',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPACING: Consistent rhythm
  // ═════════════════════════════════════════════════════════════════════════════

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ANIMATION: Smooth transitions
  // ═════════════════════════════════════════════════════════════════════════════

  animation: {
    timing: {
      instant: '0ms',
      fast: '100ms',
      normal: '200ms',
      slow: '400ms',
    },
    easing: {
      linear: 'linear',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
};

// Export individual systems for component usage
export const colors = designSystem.colors;
export const typography = designSystem.typography;
export const components = designSystem.components;
export const mcpNavigation = designSystem.mcpNavigation;
export const layout = designSystem.layout;
export const spacing = designSystem.spacing;
export const animation = designSystem.animation;
