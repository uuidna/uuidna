/**
 * Integration Blueprint Template
 *
 * Structure for defining real-world API + dataset connections
 * Used to auto-generate adapters, schemas, and test fixtures
 */

// ============================================================================
// BLUEPRINT TYPES
// ============================================================================

export interface APIEndpoint {
  name: string
  description: string
  url?: string
  library?: string
  authentication: "none" | "api_key" | "oauth" | "jwt" | "mTLS"
  protocol: "REST" | "gRPC" | "GraphQL" | "Python" | "R"
  rate_limit?: string
  documentation: string
  status: "stable" | "beta" | "experimental" | "deprecated"
  free_tier: boolean
}

export interface Dataset {
  name: string
  description: string
  domain: string
  size: string
  format: "CSV" | "JSON" | "Parquet" | "Images" | "TFRecord" | "HDF5"
  access_url: string
  license: string
  sample_count?: number
  features?: number
  split: {
    train?: number
    test?: number
    validation?: number
  }
}

export interface IntegrationBlueprint {
  id: string
  domain: "causal" | "xai" | "federated" | "synthesis" | "zero_shot"
  theorem_tools: string[]
  apis: APIEndpoint[]
  datasets: Dataset[]
  integration_pattern: "adapter" | "client_library" | "embedded_service"
  complexity: "simple" | "medium" | "complex"
  estimated_effort_hours: number
  dependencies: string[]
  test_fixtures: {
    input_sample: any
    expected_output: any
    reference_implementation: string
  }
  deployment_notes: string
  success_criteria: {
    accuracy_threshold: number
    latency_ms: number
    throughput_qps: number
  }
}

// ============================================================================
// CAUSAL INFERENCE BLUEPRINTS
// ============================================================================

export const CAUSAL_BLUEPRINTS: IntegrationBlueprint[] = [
  {
    id: "causal_dowhy",
    domain: "causal",
    theorem_tools: [
      "causal_dag_exists",
      "causal_backdoor_adjustment",
      "causal_ate"
    ],
    apis: [
      {
        name: "DoWhy",
        description: "Python library for causal inference",
        library: "dowhy",
        authentication: "none",
        protocol: "Python",
        documentation: "https://microsoft.github.io/DoWhy/",
        status: "stable",
        free_tier: true
      },
      {
        name: "DoWhy Causal Model API",
        description: "REST endpoint for causal graph validation",
        url: "https://dowhy.azurewebsites.net/api/validate",
        authentication: "api_key",
        protocol: "REST",
        documentation: "https://microsoft.github.io/DoWhy/",
        status: "beta",
        free_tier: true,
        rate_limit: "100/minute"
      }
    ],
    datasets: [
      {
        name: "Lalonde NSW Dataset",
        description: "Real observational data for causal inference benchmarking",
        domain: "causal",
        size: "445 MB",
        format: "CSV",
        access_url: "https://www.nber.org/research/data/national-supported-work-demonstration-nsw",
        license: "Public Domain",
        sample_count: 614,
        features: 10,
        split: { train: 400, test: 214 }
      },
      {
        name: "IHDP Benchmark Dataset",
        description: "Infant Health and Development Program dataset",
        domain: "causal",
        size: "50 MB",
        format: "CSV",
        access_url: "https://github.com/AMLab-Amsterdam/CEVAE",
        license: "MIT",
        sample_count: 747,
        features: 25,
        split: { train: 600, test: 147 }
      },
      {
        name: "ACIC Datasets",
        description: "Atlantic Causal Inference Conference benchmarks",
        domain: "causal",
        size: "2 GB",
        format: "CSV",
        access_url: "https://github.com/rguo12/acic_data_challenge_2016",
        license: "MIT",
        sample_count: 5000,
        features: 58,
        split: { train: 4000, test: 1000 }
      }
    ],
    integration_pattern: "adapter",
    complexity: "medium",
    estimated_effort_hours: 16,
    dependencies: ["dowhy", "networkx", "numpy", "pandas"],
    test_fixtures: {
      input_sample: {
        variables: ["treatment", "outcome", "confounder1", "confounder2"],
        edges: [
          ["confounder1", "treatment"],
          ["confounder1", "outcome"],
          ["treatment", "outcome"]
        ]
      },
      expected_output: {
        dag_exists: true,
        acyclic: true,
        adjustment_sets: [["confounder1"]]
      },
      reference_implementation: "DoWhy.CausalModel"
    },
    deployment_notes: "DoWhy is production-ready. Use REST API for scalability.",
    success_criteria: {
      accuracy_threshold: 0.95,
      latency_ms: 500,
      throughput_qps: 100
    }
  }
]

// ============================================================================
// XAI BLUEPRINTS
// ============================================================================

export const XAI_BLUEPRINTS: IntegrationBlueprint[] = [
  {
    id: "xai_shap",
    domain: "xai",
    theorem_tools: [
      "xai_feature_importance",
      "xai_shap_values",
      "xai_saliency"
    ],
    apis: [
      {
        name: "SHAP",
        description: "Python library for ML model interpretability",
        library: "shap",
        authentication: "none",
        protocol: "Python",
        documentation: "https://shap.readthedocs.io/",
        status: "stable",
        free_tier: true
      },
      {
        name: "SHAP Cloud API",
        description: "Cloud-hosted SHAP computation service",
        url: "https://api.shap.run/compute",
        authentication: "api_key",
        protocol: "REST",
        documentation: "https://shap.run/docs",
        status: "beta",
        free_tier: true,
        rate_limit: "50/minute"
      }
    ],
    datasets: [
      {
        name: "Adult Income Dataset",
        description: "UCI ML repository classification dataset",
        domain: "xai",
        size: "10 MB",
        format: "CSV",
        access_url: "https://archive.ics.uci.edu/ml/datasets/adult",
        license: "CC BY 4.0",
        sample_count: 32561,
        features: 14,
        split: { train: 24765, test: 7796 }
      },
      {
        name: "ImageNet Explanations",
        description: "Pre-computed SHAP values for ImageNet images",
        domain: "xai",
        size: "500 GB",
        format: "TFRecord",
        access_url: "https://github.com/interpretability/imagenet-explanations",
        license: "CC0",
        sample_count: 50000,
        features: 1000,
        split: { train: 40000, test: 10000 }
      }
    ],
    integration_pattern: "adapter",
    complexity: "medium",
    estimated_effort_hours: 12,
    dependencies: ["shap", "scikit-learn", "xgboost"],
    test_fixtures: {
      input_sample: {
        model: "XGBoost classifier",
        input: [0.5, 0.3, 0.2, 0.1],
        method: "shap"
      },
      expected_output: {
        importances: [0.6, 0.25, 0.1, 0.05],
        sum_check: 1.0,
        bounded: true
      },
      reference_implementation: "shap.Explainer"
    },
    deployment_notes: "SHAP computation can be expensive for large models. Use cloud API for production.",
    success_criteria: {
      accuracy_threshold: 0.98,
      latency_ms: 2000,
      throughput_qps: 10
    }
  }
]

// ============================================================================
// FEDERATED LEARNING BLUEPRINTS
// ============================================================================

export const FEDERATED_BLUEPRINTS: IntegrationBlueprint[] = [
  {
    id: "federated_tff",
    domain: "federated",
    theorem_tools: [
      "fed_non_iid",
      "fed_differential_privacy",
      "fed_dropout_resilience"
    ],
    apis: [
      {
        name: "TensorFlow Federated",
        description: "Federated learning framework",
        library: "tensorflow_federated",
        authentication: "none",
        protocol: "Python",
        documentation: "https://www.tensorflow.org/federated",
        status: "stable",
        free_tier: true
      },
      {
        name: "Flower",
        description: "Federated learning framework (framework-agnostic)",
        library: "flwr",
        authentication: "none",
        protocol: "Python",
        documentation: "https://flower.dev/docs/",
        status: "stable",
        free_tier: true
      }
    ],
    datasets: [
      {
        name: "MNIST Federated",
        description: "Federated MNIST dataset partitioned by client",
        domain: "federated",
        size: "1 GB",
        format: "TFRecord",
        access_url: "https://www.tensorflow.org/federated/datasets",
        license: "CC0",
        sample_count: 70000,
        features: 784,
        split: { train: 60000, test: 10000 }
      },
      {
        name: "Shakespeare Federated",
        description: "Character-level text data partitioned by writer",
        domain: "federated",
        size: "100 MB",
        format: "TFRecord",
        access_url: "https://www.tensorflow.org/federated/datasets",
        license: "CC0",
        sample_count: 715986,
        features: 256,
        split: { train: 644000, test: 71986 }
      }
    ],
    integration_pattern: "adapter",
    complexity: "complex",
    estimated_effort_hours: 24,
    dependencies: ["tensorflow_federated", "numpy", "pandas"],
    test_fixtures: {
      input_sample: {
        clients: 10,
        epsilon: 1.0,
        delta: 0.001
      },
      expected_output: {
        privacy_guaranteed: true,
        robustness_score: 0.95,
        convergence_possible: true
      },
      reference_implementation: "tensorflow_federated.learning"
    },
    deployment_notes: "Federated learning requires distributed infrastructure. Use managed platform for production.",
    success_criteria: {
      accuracy_threshold: 0.96,
      latency_ms: 5000,
      throughput_qps: 5
    }
  }
]

// ============================================================================
// PROGRAM SYNTHESIS BLUEPRINTS
// ============================================================================

export const SYNTHESIS_BLUEPRINTS: IntegrationBlueprint[] = [
  {
    id: "synthesis_github_copilot",
    domain: "synthesis",
    theorem_tools: [
      "syn_search_space",
      "syn_heuristic_guided"
    ],
    apis: [
      {
        name: "GitHub Copilot API",
        description: "Code generation and completion API",
        url: "https://api.github.com/copilot",
        authentication: "oauth",
        protocol: "REST",
        documentation: "https://docs.github.com/en/copilot",
        status: "beta",
        free_tier: false,
        rate_limit: "60/minute"
      },
      {
        name: "Hugging Face CodeT5",
        description: "Unified pre-trained encoder-decoder model for code understanding and generation",
        library: "transformers",
        authentication: "none",
        protocol: "Python",
        documentation: "https://huggingface.co/Salesforce/codet5",
        status: "stable",
        free_tier: true
      }
    ],
    datasets: [
      {
        name: "CodeSearchNet",
        description: "Large-scale dataset of code and documentation",
        domain: "synthesis",
        size: "20 GB",
        format: "JSON",
        access_url: "https://github.com/github/CodeSearchNet",
        license: "ODbL",
        sample_count: 6000000,
        features: 4,
        split: { train: 5000000, test: 1000000 }
      },
      {
        name: "Human Eval",
        description: "Hand-written benchmarks for code generation models",
        domain: "synthesis",
        size: "1 MB",
        format: "JSON",
        access_url: "https://github.com/openai/human-eval",
        license: "MIT",
        sample_count: 164,
        features: 3,
        split: { train: 0, test: 164 }
      }
    ],
    integration_pattern: "client_library",
    complexity: "complex",
    estimated_effort_hours: 32,
    dependencies: ["transformers", "torch", "tokenizers"],
    test_fixtures: {
      input_sample: {
        prompt: "def fibonacci(n):",
        max_tokens: 50,
        temperature: 0.5
      },
      expected_output: {
        generated_code: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
        tokens: 20,
        valid: true
      },
      reference_implementation: "CodeT5"
    },
    deployment_notes: "Copilot requires OAuth. CodeT5 is open-source alternative. Use HuggingFace hosted models for scalability.",
    success_criteria: {
      accuracy_threshold: 0.85,
      latency_ms: 3000,
      throughput_qps: 5
    }
  }
]

// ============================================================================
// ZERO-SHOT LEARNING BLUEPRINTS
// ============================================================================

export const ZERO_SHOT_BLUEPRINTS: IntegrationBlueprint[] = [
  {
    id: "zero_shot_clip",
    domain: "zero_shot",
    theorem_tools: [
      "zsl_semantic_space",
      "zsl_domain_shift"
    ],
    apis: [
      {
        name: "OpenAI CLIP",
        description: "Vision-language model for zero-shot classification",
        url: "https://api.openai.com/v1/embeddings",
        authentication: "api_key",
        protocol: "REST",
        documentation: "https://platform.openai.com/docs/api-reference",
        status: "stable",
        free_tier: false,
        rate_limit: "3500/minute"
      },
      {
        name: "HuggingFace CLIP",
        description: "Open-source CLIP implementation",
        library: "transformers",
        authentication: "none",
        protocol: "Python",
        documentation: "https://huggingface.co/openai/clip-vit-base-patch32",
        status: "stable",
        free_tier: true
      }
    ],
    datasets: [
      {
        name: "ImageNet",
        description: "Large-scale visual database for object recognition",
        domain: "zero_shot",
        size: "150 GB",
        format: "Images",
        access_url: "https://www.image-net.org/",
        license: "Research only",
        sample_count: 14000000,
        features: 21000,
        split: { train: 1281167, test: 50000, validation: 50000 }
      },
      {
        name: "Conceptual Captions",
        description: "Large-scale image-text pairs for vision-language pretraining",
        domain: "zero_shot",
        size: "50 GB",
        format: "JSON",
        access_url: "https://ai.google.com/research/ConceptualCaptions/",
        license: "CC BY 4.0",
        sample_count: 3300000,
        features: 1,
        split: { train: 3300000 }
      }
    ],
    integration_pattern: "adapter",
    complexity: "medium",
    estimated_effort_hours: 12,
    dependencies: ["torch", "transformers", "pillow"],
    test_fixtures: {
      input_sample: {
        image: "path/to/image.jpg",
        classes: ["dog", "cat", "bird"],
        model: "CLIP"
      },
      expected_output: {
        predictions: [0.85, 0.10, 0.05],
        top_class: "dog",
        confidence: 0.85
      },
      reference_implementation: "CLIP"
    },
    deployment_notes: "Use local HuggingFace models for cost efficiency. OpenAI API for production scale.",
    success_criteria: {
      accuracy_threshold: 0.92,
      latency_ms: 1000,
      throughput_qps: 20
    }
  }
]

// ============================================================================
// BLUEPRINT REGISTRY
// ============================================================================

export const ALL_BLUEPRINTS = {
  causal: CAUSAL_BLUEPRINTS,
  xai: XAI_BLUEPRINTS,
  federated: FEDERATED_BLUEPRINTS,
  synthesis: SYNTHESIS_BLUEPRINTS,
  zero_shot: ZERO_SHOT_BLUEPRINTS
}

export function getBlueprintsForDomain(domain: string): IntegrationBlueprint[] {
  return ALL_BLUEPRINTS[domain as keyof typeof ALL_BLUEPRINTS] || []
}

export function getTotalBlueprints(): number {
  return Object.values(ALL_BLUEPRINTS).flat().length
}

export function getBlueprintById(id: string): IntegrationBlueprint | undefined {
  return Object.values(ALL_BLUEPRINTS)
    .flat()
    .find(bp => bp.id === id)
}
