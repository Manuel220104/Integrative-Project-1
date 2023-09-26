/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export function Signup() {
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-50">
          <body class="h-full">
          ```
        */}
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">CREAR CUENTA</h2>

                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombres
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        autoComplete="nombre"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Ingrese su Nombre"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                    Apellidos
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        autoComplete="current-surname"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Ingrese su Apellido"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">
                                    Tipo de Documento
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="documentType"
                                        name="documentType"
                                        autoComplete="current-documentType"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>Seleccionar tipo de documento</option>
                                        <option value="cedula">Cédula de ciudadania</option>
                                        <option value="tarjeta_identidad">Tarjeta de Identidad</option>
                                        <option value="pasaporte">Numero de Pasaporte</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="identification" className="block text-sm font-medium text-gray-700">
                                    Número de Identificación
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="identification"
                                        name="identification"
                                        type="number"
                                        autoComplete="current-identification"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Ingrese su número de identificación"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Direccion de correo
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Ingrese su Correo Electronico"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Repeat Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="re_password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Confirmar Contraseña"
                                    />
                                </div>
                            </div>



                            <div>
                                <button
                                    type="submit"
                                    className="Boton-Guardar w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Crear
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}