#!/usr/bin/env python
"""Test script to verify FastAPI application loads successfully."""

try:
    from main import app
    print("✓ FastAPI app loaded successfully")
    print("\nAvailable Routes:")
    for route in app.routes:
        if hasattr(route, "methods"):
            methods = ", ".join(route.methods - {"OPTIONS"})
            print(f"  {methods:12} {route.path}")
    print("\n✓ All imports and dependencies are working")
except Exception as e:
    print(f"✗ Error loading app: {e}")
    import traceback
    traceback.print_exc()
