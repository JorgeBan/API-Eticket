### Routes

**Eventos** 
`GET`	  /api/v1.0.0/eventosDatos
	Obtiene Todos los eventos con todo su informacion
```json
[
	{
		"idevento": 1,
		"nombre": "Hamlet de los Andes ",
		"estado": "Inactivo",
		"descripcion": "La muerte del padre. Una de las pruebas de la vida a la cual cada uno de nosotros es llamado. Nuestro Hamlet es un hombre de hoy que, como el personaje de Shakespeare, ha perdido la comprensión del “sí mismo”. Siguiendo la sombra del espíritu, Hamlet consigue atravesar la puerta del desconocido, empezando un viaje que pueda acercarle a sus ancestros y a sus raíces. La frustración y la pérdida de raíces de- satarán en Hamlet una crisis existencial que lo sumergirá en el alcohol. ¿Quién es Hamlet? ¿Soy yo, o eres tu? ¿Es cada uno de nosotros, que nos preguntamos quiénes somos en realidad? ¿Es Hamlet el propio Teatro de los Andes? Ser o no ser, esa es la cuestión. Ser qué, quién y cómo.",
		"contacto": 33347448,
		"idcategoria": 4,
		"categoria_evento": {
			"idcategoria": 4,
			"nombre": "Culturales",
			"descripcion": "Cursos, actividades de formación o actividades artísticas, por ejemplo, una exposición, un concierto o una obra de teatro."
		},
		"ubicacions": [
			{
				"idubicacion": 1,
				"nombre": "Teatro Rene Moreno",
				"direccion": "Calle Rene Moreno,entre Manuel Ignacio y Mercado 440",
				"latitud": "-17.78745332",
				"longitud": "-63.18119180",
				"cantidad_de_personas": 20,
				"idevento": 1
			}
		],
		"imagenes_eventos": [
			{
				"idimagenevento": 1,
				"nombre": "Banner de la obra",
				"url": "https://res.cloudinary.com/dyftrou7y/image/upload/v1651974034/Images/tj10xbizbo4g1eigmqpb.jpg",
				"idpublico": "Images/tj10xbizbo4g1eigmqpb",
				"idevento": 1
			},
			{
				"idimagenevento": 2,
				"nombre": "2022-05-08T14-46-41.889Z.jpg",
				"url": "http://res.cloudinary.com/dyftrou7y/image/upload/v1652021203/Images/tomw0xcnlaijo9oeezws.jpg",
				"idpublico": "Images/tomw0xcnlaijo9oeezws",
				"idevento": 1
			}
		]
	}
]
````



`GET`	 /api/v1.0.0/eventosEncabezados
Obtiene todos los encabezados de los eventos (A diferencia del anterior aqui no se obtiene sus imagenes y ubicaciones)
```json
[
	{
		"idevento": 1,
		"nombre": "Hamlet de los Andes ",
		"estado": "Inactivo",
		"descripcion": "La muerte del padre. Una de las pruebas de la vida a la cual cada uno de nosotros es llamado. Nuestro Hamlet es un hombre de hoy que, como el personaje de Shakespeare, ha perdido la comprensión del “sí mismo”. Siguiendo la sombra del espíritu, Hamlet consigue atravesar la puerta del desconocido, empezando un viaje que pueda acercarle a sus ancestros y a sus raíces. La frustración y la pérdida de raíces de- satarán en Hamlet una crisis existencial que lo sumergirá en el alcohol. ¿Quién es Hamlet? ¿Soy yo, o eres tu? ¿Es cada uno de nosotros, que nos preguntamos quiénes somos en realidad? ¿Es Hamlet el propio Teatro de los Andes? Ser o no ser, esa es la cuestión. Ser qué, quién y cómo.",
		"contacto": 33347448,
		"idcategoria": 4
	}
]
```

`GET`	 /api/v1.0.0/eventosEncabezados/1
Obtiene el encabezado del evento con el id especificado

`GET`	 /api/v1.0.0/eventosDatos/1
Obtiene el encabezado del evento con el id especificado

`POST` /api/v1.0.0/eventos 
Crea un evento con los siguientes datos, devolvera el json con los datos creados
```json
{
	"estado": "Inactivo", //Por defecto
	"idevento": 6, //Por defecto 
	"nombre": "Evento de prueba 2", //obligatorio string
	"idcategoria": 1, //obligatorio integer (id de la categoria)
	"descripcion": ".....", //opcional string 
	"contacto": null //opcional integer
}
```

`PUT`	/api/v1.0.0/eventos/1

`PUT` /api/v1.0.0/eventos/estado/1
actualiza el estado del evento verificando que tenga al menos una ubicacion para cambiar al estado activo


`DELETE` /api/v1.0.0/eventos/1
Devuelve 1 si elimina y 0 si no elimina

** Categorias**
`GET` /api/v1.0.0/categorias/
```json
[
	{
		"idcategoria": 1,
		"nombre": "Deportivos",
		"descripcion": "Son eventos en los que se participa o se observa un espectáculo deportivo. Incluyen actividades deportivas, recreativas y competiciones deportivas."
	},
	{
		"idcategoria": 2,
		"nombre": "Empresariales y corporativos",
		"descripcion": "Reuniones, charlas, presentaciones de productos, seminarios, conferencias, encuentros, congresos y ferias."
	},
	{
		"idcategoria": 3,
		"nombre": "Academicos",
		"descripcion": "Talleres, Seminarios, Simposios"
	},
	{
		"idcategoria": 4,
		"nombre": "Culturales",
		"descripcion": "Cursos, actividades de formación o actividades artísticas, por ejemplo, una exposición, un concierto o una obra de teatro."
	},
	{
		"idcategoria": 5,
		"nombre": "Espectaculo",
		"descripcion": "Eventos que se diseñan explícitamente como experiencia de disfrute y entretenimiento, con un marcado acento en la difusión artística única, es decir, en la presentación de productos culturales a un público más o menos amplio."
	},
	{
		"idcategoria": 6,
		"nombre": "Categoria de prueba",
		"descripcion": "Esta es una categoria de prueba"
	}
]
```

`GET` /api/v1.0.0/categorias/1
```json
	{
		"idcategoria": 1,
		"nombre": "Deportivos",
		"descripcion": "Son eventos en los que se participa o se observa un espectáculo deportivo. Incluyen actividades deportivas, recreativas y competiciones deportivas."
	},
```

`POST` /api/v1.0.0/categorias/
```json
{
	"idcategoria": 6, //Por defecto
	"nombre": "Categoria de prueba", //Obligatorio String
	"descripcion": "Esta es una categoria de prueba" //Opcional String
}
```

**Imagenes_evento**

`GET` /api/v1.0.0/imagenesEvento/
```json
[
	{
		"idimagenevento": 1,
		"nombre": "Banner de la obra",
		"url": "https://res.cloudinary.com/dyftrou7y/image/upload/v1651974034/Images/tj10xbizbo4g1eigmqpb.jpg",
		"idpublico": "Images/tj10xbizbo4g1eigmqpb",
		"idevento": 1
	},
	{
		"idimagenevento": 2,
		"nombre": "2022-05-08T14-46-41.889Z.jpg",
		"url": "http://res.cloudinary.com/dyftrou7y/image/upload/v1652021203/Images/tomw0xcnlaijo9oeezws.jpg",
		"idpublico": "Images/tomw0xcnlaijo9oeezws",
		"idevento": 1
	}
]
```

`GET`  /api/v1.0.0/imagenesEvento/1

`POST`  /api/v1.0.0/imagenesEvento
Sube las imagenes al servidor de imagenes de cloudinary y guardas las url en la BD
requiere id del evento en el body y las imagens en el files
[![example](https://res.cloudinary.com/dyftrou7y/image/upload/v1652030174/Images/Capture_cgt870.png "example")](http://https://res.cloudinary.com/dyftrou7y/image/upload/v1652030174/Images/Capture_cgt870.png "example")


`DELETE` /api/v1.0.0/imagenesEvento/1
elimina la imagen del servidor y de la BD

`GET` /api/v1.0.0/ubicaciones

`GET`  /api/v1.0.0/ubicaciones/1
Obtiene toda la informacion de la ubicacion, con sus sectores y horarios
```json
{
		"idubicacion": 1,
		"nombre": "Teatro Rene Moreno",
		"direccion": "Calle Rene Moreno,entre Manuel Ignacio y Mercado 440",
		"latitud": "-17.78745332",
		"longitud": "-63.18119180",
		"cantidad_de_personas": 20,
		"idevento": 1,
		"horarios": [
			{
				"idhorario": 1,
				"fecha_hora": "2022-05-15T19:00:00.000Z",
				"idubicacion": 1
			},
			{
				"idhorario": 2,
				"fecha_hora": "2022-05-15T23:00:00.000Z",
				"idubicacion": 1
			},
			{
				"idhorario": 3,
				"fecha_hora": "2022-05-17T00:00:00.000Z",
				"idubicacion": 1
			}
		],
		"sectors": [
			{
				"idsector": 2,
				"nombre": "Sector B",
				"capacidad": 10,
				"referencia": "Sector ubicado en el ala derecha de la sala",
				"idubicacion": 1
			},
			{
				"idsector": 1,
				"nombre": "Sector A",
				"capacidad": 10,
				"referencia": "Sector ubicado en el ala izquierda de la sala",
				"idubicacion": 1
			}
		]
	}
```

`POST` /api/v1.0.0/ubicaciones
```json
{
	"idubicacion": 6, //Por defecto
	"nombre": "Ubicacion de prueba ", //obligatorio string
	"direccion": "Esta es la ubicacion de prueba 3", //obligatorio string
	"latitud": "-18.36982571", //obligatorio Decimal
	"longitud": "-65.25146985", //obligatorio decimal
	"cantidad_de_personas": 10, //obligatorio integer
	"idevento": 6 //obligatorio integer
}
```

`PUT` /api/v1.0.0/ubicaciones/3

`DELETE` /api/v1.0.0/ubicaciones/3

**Horarios**
`GET` /api/v1.0.0/horarios/

`GET` /api/v1.0.0/horarios/1

```json
{
		"idhorario": 1,
		"fecha_hora": "2022-05-15T19:00:00.000Z",
		"idubicacion": 1
	},
```

`POST` /api/v1.0.0/horarios/
```json
{
	"idhorario": 8, 
	"fecha_hora": "2022-05-15T07:10:00.000Z", //obligatorio
	"idubicacion": 4 //Obligatorio
}
```

`PUT` /api/v1.0.0/horarios/7

`DELETE` /api/v1.0.0/horarios/7

**Sector**
`GET` /api/v1.0.0/sectores/


`GET` /api/v1.0.0/sectores/1
```json
{
		"idsector": 1,
		"nombre": "Sector A",
		"capacidad": 10,
		"referencia": "Sector ubicado en el ala izquierda de la sala",
		"idubicacion": 1,
		"espacios": [
			{
				"idespacio": 1,
				"identificador": "A1",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 2,
				"identificador": "A2",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 3,
				"identificador": "A3",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 4,
				"identificador": "A4",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 5,
				"identificador": "A5",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 6,
				"identificador": "A6",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 7,
				"identificador": "A7",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 8,
				"identificador": "A8",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 9,
				"identificador": "A9",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			},
			{
				"idespacio": 10,
				"identificador": "A10",
				"estado": "Disponible",
				"tipo_de_espacio": "Silla",
				"cantidad_de_personas": 1,
				"idsector": 1
			}
		]
	}
```

`POST` /api/v1.0.0/sectores

```json
{
	"idsector": 4,
	"nombre": "Sector de prueba ", //obligatorio
	"capacidad": 5, //obligatorio
	"referencia": "Sector ubicado en ultima fila", //opcional
	"idubicacion": 4 //obligatorio
}
```

`PUT` /api/v1.0.0/sectores/3

`DELETE` /api/v1.0.0/sectores/3


**Espacio**
`GET` /api/v1.0.0/espacios/

`GET` /api/v1.0.0/espacios/20
```json
{
	"idespacio": 20,
	"identificador": "B10",
	"estado": "Disponible",
	"tipo_de_espacio": "Silla",
	"cantidad_de_personas": 1,
	"idsector": 2
}
```

`POST` /api/v1.0.0/espacios

```json
{
	"estado": "Disponible", //por defecto
	"idespacio": 23, // por defecto
	"identificador": "M2", //obligatorio
	"tipo_de_espacio": "Mesa", //Obligatorio
	"cantidad_de_personas": 2, // obligatorio
	"idsector": 4 //obligatorio
}
```
`PUT` /api/v1.0.0/espacios/20

`DELETE` /api/v1.0.0/espacios/20
