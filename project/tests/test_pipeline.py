"""Tests for the KG construction pipeline."""

from pathlib import Path

from rdflib import Graph

from src.pipeline import create_minimal_kg


PROJECT_ROOT = Path(__file__).resolve().parents[1]


def test_create_minimal_kg():
    g = create_minimal_kg(PROJECT_ROOT / "ontology" / "cloud_service.ttl")
    assert isinstance(g, Graph)
    assert len(g) > 0
    # Check that the sample Azure instance was added
    assert (
        "https://example.org/cloud-service-kg#Azure_NC24ads_A100_v4",
        None,
        None,
    ) in g
