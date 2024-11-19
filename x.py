import sympy as sp
import math
# Definir las variables simbólicas
x, y, z = sp.symbols('x y z')

# Función objetivo: f(x, y, z) = x^(-2) - y^(-2) - z^2
objective_func = math.e**(x*y)

# Restricción: g(x, y, z) = 1 - (x + y + z) = 0
constraint = 16 - (x**3 + y**3)

# Definir el multiplicador de Lagrange
lambda_0 = sp.symbols('lambda_0')

# Definir el Lagrangiano
lagrangian = objective_func + lambda_0 * constraint

# Derivar el Lagrangiano respecto a x, y, z, y lambda_0
lagrange_eq_x = sp.diff(lagrangian, x)
lagrange_eq_y = sp.diff(lagrangian, y)
lagrange_eq_z = sp.diff(lagrangian, z)
lagrange_eq_lambda = sp.diff(lagrangian, lambda_0)

# Resolver el sistema de ecuaciones
solutions = sp.solve([lagrange_eq_x, lagrange_eq_y, lagrange_eq_z, lagrange_eq_lambda], [x, y, z, lambda_0])

# Mostrar las soluciones
print("Soluciones:")
if isinstance(solutions, dict):
    formatted_sol = {var: solutions[var].evalf() for var in solutions}
    print(formatted_sol)
else:
    for sol in solutions:
        formatted_sol = {var: sol[i].evalf() for i, var in enumerate([x, y, z])}
        print(formatted_sol)
        
