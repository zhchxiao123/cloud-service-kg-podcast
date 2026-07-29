"""Tests for ontology loading and SHACL validation."""

from pathlib import Path

import pytest
from rdflib import Graph, Namespace, URIRef

from src.ontology import load_ontology, load_shapes, validate_ontology_with_shacl

PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_ontology_loads():
    g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    assert isinstance(g, Graph)
    assert len(g) > 0


def test_cloud_service_class_exists():
    g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    cskg = Namespace("https://example.org/cloud-service-kg#")
    # A class should appear as the subject of owl:Class or object of rdfs:subClassOf
    assert (
        cskg.CloudService,
        URIRef("http://www.w3.org/2002/07/owl#Class"),
        None,
    ) in g or (
        None,
        URIRef("http://www.w3.org/2000/01/rdf-schema#subClassOf"),
        cskg.CloudService,
    ) in g


def test_sample_data_passes_shacl():
    data_g = load_ontology(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    shapes_g = load_shapes(PROJECT_ROOT / "ontology" / "shapes.ttl")
    conforms, report_text, _ = validate_ontology_with_shacl(data_g, shapes_g)
    if not conforms:
        pytest.fail(f"SHACL validation failed:\n{report_text}")
