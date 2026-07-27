"""Minimal knowledge-graph construction pipeline.

This is a placeholder for the end-to-end pipeline demonstrated in EP14.
It reads raw text documents, extracts entities/relations, maps them to the
ontology, and writes RDF/Turtle.
"""

import json
from pathlib import Path
from typing import Optional

import typer
from rdflib import Graph, Literal, Namespace, URIRef
from rdflib.namespace import RDF, RDFS, XSD

from src.ontology import load_ontology


app = typer.Typer(help="Cloud service KG construction pipeline")
CSKG = Namespace("https://example.org/cloud-service-kg#")


def create_minimal_kg(ontology_path: Path) -> Graph:
    """Create a knowledge graph that imports the ontology and adds sample data."""
    g = load_ontology(ontology_path)
    g.bind("cskg", CSKG)

    # Add a sample compute service
    svc = CSKG["Azure_NC24ads_A100_v4"]
    g.add((svc, RDF.type, CSKG.ComputeService))
    g.add((svc, RDFS.label, Literal("Azure NC24ads A100 v4", lang="en")))
    g.add((svc, CSKG.hasProvider, CSKG.Azure))
    g.add((svc, CSKG.hasGPU, Literal(True, datatype=XSD.boolean)))
    g.add((svc, CSKG.serviceCode, Literal("NC24ads_A100_v4")))
    g.add((svc, CSKG.dataSource, Literal("https://learn.microsoft.com/azure/virtual-machines/nc-a100-v4-series")))
    g.add((svc, CSKG.lastUpdated, Literal("2026-07-27", datatype=XSD.date)))
    return g


@app.command()
def build(
    ontology: Path = typer.Option(..., "--ontology", "-o", help="Path to ontology TTL file"),
    output: Path = typer.Option("kg.ttl", "--output", help="Output KG file"),
):
    """Build a minimal knowledge graph from the ontology and sample data."""
    g = create_minimal_kg(ontology)
    g.serialize(destination=output, format="turtle")
    typer.echo(f"Knowledge graph written to {output}")


@app.command()
def stats(
    input_file: Path = typer.Argument(..., help="Input KG TTL file"),
):
    """Print basic statistics about a knowledge graph."""
    g = Graph()
    g.parse(input_file, format="turtle")
    typer.echo(f"Triples: {len(g)}")

    classes = set()
    for s, p, o in g:
        if p == RDF.type and isinstance(o, URIRef):
            classes.add(str(o))
    typer.echo(f"Distinct rdf:type objects: {len(classes)}")
    for c in sorted(classes):
        count = sum(1 for _ in g.subjects(RDF.type, URIRef(c)))
        typer.echo(f"  {c}: {count}")


if __name__ == "__main__":
    app()
