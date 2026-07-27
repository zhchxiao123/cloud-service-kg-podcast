"""Tests for ontology loading and SHACL validation."""

from pathlib import Path

import pytest
from rdflib import Graph

from src.ontology import load_ontology, load_shapes, validate_ontology_with_shacl


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_ontology_loads():
    g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    assert isinstance(g, Graph)
    assert len(g) > 0


def test_cloud_service_class_exists():
    g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    ns = "https://example.org/cloud-service-kg#"
    assert (f"{ns}CloudService", None, None) in g or (None, None, f"{ns}CloudService") in g


def test_sample_data_passes_shacl():
    data_g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    shapes_g = load_shapes(PROJECT_ROOT / "ontology" / "shapes.ttl")
    conforms, report_text, _ = validate_ontology_with_shacl(data_g, shapes_g)
    if not conforms:
        pytest.fail(f"SHACL validation failed:\n{report_text}")
