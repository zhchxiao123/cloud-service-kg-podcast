"""Utilities for loading and validating the cloud service ontology."""

from pathlib import Path
from typing import Union

from rdflib import Graph, Namespace, URIRef
from pyshacl import validate


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ONTOLOGY_DIR = PROJECT_ROOT / "ontology"


def load_ontology(path: Union[str, Path] = ONTOLOGY_DIR / "cloud_service.ttl") -> Graph:
    """Load the ontology from a Turtle file."""
    g = Graph()
    g.parse(path, format="turtle")
    g.bind("cskg", "https://example.org/cloud-service-kg#")
    return g


def load_shapes(path: Union[str, Path] = ONTOLOGY_DIR / "shapes.ttl") -> Graph:
    """Load SHACL shapes from a Turtle file."""
    g = Graph()
    g.parse(path, format="turtle")
    return g


def validate_ontology_with_shacl(
    data_graph: Graph,
    shapes_graph: Graph,
    inference: str = "none",
) -> tuple[bool, str, Graph]:
    """Validate a data graph against SHACL shapes.

    Returns a tuple of (conforms, report_text, report_graph).
    """
    conforms, report_graph, report_text = validate(
        data_graph,
        shacl_graph=shapes_graph,
        inference=inference,
    )
    return conforms, report_text, report_graph


def get_classes(g: Graph) -> list[str]:
    """Return a sorted list of class URIs in the ontology."""
    ns = Namespace("http://www.w3.org/2002/07/owl#")
    return sorted(set(str(uri) for uri in g.objects(None, ns.Class)))
