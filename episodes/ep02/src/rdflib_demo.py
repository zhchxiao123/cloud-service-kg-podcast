"""Minimal RDF triple demo using rdflib.

This script loads a small Turtle snippet and prints the triples.
Run it from the repo root with:

    source venv/bin/activate
    python episodes/ep02/src/rdflib_demo.py
"""

from rdflib import Graph, Literal, Namespace, URIRef
from rdflib.namespace import RDF, RDFS, XSD

EX = Namespace("http://example.org/ep02#")

# Build a tiny RDF graph in memory
g = Graph()
g.bind("ex", EX)

bob = EX["Bob"]
alice = EX["Alice"]

# Bob is a Person; his name is "Bob" (EN); his age is 30.
g.add((bob, RDF.type, EX.Person))
g.add((bob, RDFS.label, Literal("Bob", lang="en")))
g.add((bob, EX.knows, alice))
g.add((bob, EX.age, Literal(30, datatype=XSD.integer)))

# Alice is a Person; her name is "Alice" (EN) and "艾丽斯" (ZH).
g.add((alice, RDF.type, EX.Person))
g.add((alice, RDFS.label, Literal("Alice", lang="en")))
g.add((alice, RDFS.label, Literal("艾丽斯", lang="zh")))

# Serialize to Turtle and print
print("=== Turtle ===")
print(g.serialize(format="turtle"))

# Print triple count and literal values
print(f"Total triples: {len(g)}")
for s, p, o in g:
    if isinstance(o, Literal):
        print(f"  Literal: {s.split('#')[-1]} {p.split('#')[-1]} {o!r}")
