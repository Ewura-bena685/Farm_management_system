from main import app

print('ROUTES:')
for route in app.routes:
    if hasattr(route, 'methods'):
        print(route.path, route.methods)
