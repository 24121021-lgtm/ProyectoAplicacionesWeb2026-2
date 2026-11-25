// Estructura:
// [id_producto, id_categoria, nombre, descripcion, precio,
// informacion_adicional, destacado, orden_visualizacion]

export const productos = [
  [1,2,"Con chuleta de cerdo","Spaghetti acompañado con chuleta de cerdo.",35.0,null,false,1],
  [2,2,"Con pechuga a la parrilla","Spaghetti acompañado con pechuga a la parrilla.",32.0,null,false,2],
  [3,2,"Con corazón de res","Spaghetti acompañado con corazón de res.",34.0,null,false,3],
  [4,2,"Con churrasco a la parrilla","Spaghetti acompañado con churrasco a la parrilla.",39.0,null,false,4],
  [5,2,"Con bife a la parrilla","Spaghetti acompañado con bife a la parrilla.",49.0,null,false,5],
  [6,2,"Con lomo al jugo","Spaghetti acompañado con lomo al jugo.",49.0,null,false,6],
  [7,2,"Con lomo fino","Spaghetti acompañado con lomo fino.",54.0,null,false,7],
  [8,2,"Con picaña","Spaghetti acompañado con picaña.",65.0,null,false,8],

  [9,3,"Con chuleta de cerdo","Fetuccini acompañado con chuleta de cerdo.",35.0,null,false,1],
  [10,3,"Con pechuga a la parrilla","Fetuccini acompañado con pechuga a la parrilla.",32.0,null,false,2],
  [11,3,"Con corazón de res","Fetuccini acompañado con corazón de res.",34.0,null,false,3],
  [12,3,"Con churrasco a la parrilla","Fetuccini acompañado con churrasco a la parrilla.",39.0,null,false,4],
  [13,3,"Con bife a la parrilla","Fetuccini acompañado con bife a la parrilla.",49.0,null,false,5],
  [14,3,"Con lomo al jugo","Fetuccini acompañado con lomo al jugo.",49.0,null,false,6],
  [15,3,"Con lomo fino","Fetuccini acompañado con lomo fino.",54.0,null,false,7],
  [16,3,"Con picaña","Fetuccini acompañado con picaña.",65.0,null,false,8],

  [17,4,"Churrasco 300 g","Corte sabroso y jugoso, sellado a las brasas para lograr un exterior dorado y un interior tierno.",35.0,"Términos de cocción y descripción\nSellado / inglés: exterior sellado y centro rojo, muy jugoso.\nMedio: centro rosado, suave y jugoso.\nTres cuartos: centro ligeramente rosado y textura más firme.\nBien cocido: cocción completa, sin centro rosado.",true,1],
  [18,4,"Asado de tira 300 g","Corte con hueso y vetas de grasa que aportan sabor intenso; ideal para una cocción lenta a la parrilla.",35.0,"Términos de cocción y descripción\nSellado / inglés: centro rojo y muy jugoso; no suele ser la opción más indicada para este corte.\nMedio: centro rosado y jugoso.\nTres cuartos: carne más firme y grasa bien fundida.\nBien cocido: cocción completa; se recomienda controlar el tiempo para evitar que se reseque.",false,2],
  [19,4,"Bife brasilero 300 g","Corte de res de sabor marcado y buena jugosidad, perfecto para disfrutar el sabor de la parrilla.",48.0,"Términos de cocción y descripción\nSellado / inglés: exterior dorado y centro rojo.\nMedio: centro rosado, tierno y jugoso.\nTres cuartos: centro apenas rosado, textura firme.\nBien cocido: cocción completa y centro sin tonos rosados.",false,3],
  [20,4,"Lomo fino 300 g","Corte magro, delicado y muy tierno, de textura fina y sabor suave.",48.0,"Términos de cocción y descripción\nSellado / inglés: centro rojo y máxima jugosidad.\nMedio: centro rosado, tierno y jugoso.\nTres cuartos: ligeramente rosado al centro y más firme.\nBien cocido: cocción completa; puede resultar menos jugoso.",false,4],
  [21,4,"Picaña brasilera 300 g","Corte con una característica capa de grasa que se dora en la parrilla y realza su sabor.",65.0,"Términos de cocción y descripción\nSellado / inglés: centro rojo y jugoso, con exterior bien sellado.\nMedio: centro rosado y grasa dorada.\nTres cuartos: carne más firme y grasa bien cocida.\nBien cocido: cocción completa, con menor jugosidad.",false,5],
  [22,4,"Tomahawk 500 g","Corte grueso con hueso largo, ideal para la parrilla y para quienes disfrutan una presentación especial.",68.0,"Términos de cocción y descripción\nSellado / inglés: centro rojo; requiere controlar cuidadosamente la cocción por su grosor.\nMedio: centro rosado y jugoso.\nTres cuartos: centro apenas rosado y textura firme.\nBien cocido: cocción completa hasta el centro.",false,6],
  [23,4,"Dúo parrillero","Combinación de 200 g de bife y 200 g de picaña para disfrutar dos cortes diferentes.",90.0,null,false,7],
  [24,4,"Trío parrillero","Combinación de 200 g de bife, 200 g de picaña y 200 g de lomo fino.",120.0,null,false,8],
  [25,4,"Chuleta a la parrilla 300 g","Chuleta de cerdo dorada a las brasas. Se recomienda cocinarla completamente hasta alcanzar una temperatura interna segura.",35.0,"Sobre su cocción\nBien cocida: cerdo cocinado completamente; el centro debe alcanzar una temperatura interna segura.",false,9],
  [26,4,"Costillas ahumadas BBQ","Costillas de cerdo con sabor ahumado y salsa BBQ, cocinadas hasta quedar tiernas.",43.0,"Sobre su cocción\nTiernas y bien cocidas: cocción prolongada para ablandar la carne y facilitar que se desprenda del hueso.",false,10],

  [27,5,"Anticucho de corazón","Dos palitos de corazón, papas fritas, queso, choclo y ensalada.",29.0,null,false,1],
  [28,5,"Brocheta de pollo","Dos palitos de pechuga de pollo, papa frita, queso, choclo y ensalada.",28.0,null,false,2],
  [29,5,"Brocheta de lomo","Dos palitos con trozos de lomo fino, papa frita, queso, choclo y ensalada.",37.0,null,false,3],
  [30,5,"Brocheta mixta","Lomo fino, pollo y anticucho de corazón con guarniciones.",45.0,null,false,4],
  [31,5,"Champiñones a la parrilla","Champiñones, papa frita y ensalada.",28.0,null,false,5],
  [32,5,"Mollejas a la parrilla","Papa dorada, queso y ensalada.",23.0,null,false,6],
  [33,5,"Especial","Cuatro brochetas a escoger, mollejitas, papas fritas y salsas al gusto.",59.0,null,false,7],

  [34,6,"Sopa de dieta",null,18.0,null,false,1],
  [35,6,"Sopa a la minuta",null,19.0,null,false,2],
  [36,6,"Sopa criolla",null,20.0,null,false,3],

  [37,7,"Ensalada fresca","Lechuga orgánica, tomate, pepino, brócoli, zanahoria, palta y rabanito.",15.0,null,false,1],
  [38,7,"Ensalada especial","Lechuga, tomate, zanahoria cocida, brócoli, champiñones, aceituna, palta y huevo duro.",19.0,null,false,2],
  [39,7,"Ensalada César","Lechuga, tomates, queso parmesano, crutones, huevo duro y pechuga de pollo.",27.0,null,false,3],
  [40,7,"Ensalada Salvaje","Lechuga, tomate, palta, queso, palmito, cecina y jamón.",29.0,null,false,4],
  [41,7,"Ensalada de casa","Lechuga, tomate, cebolla blanca, brócoli, palta, queso edam y pechuga a la plancha.",29.0,null,false,5],

  [42,8,"Salchipapa clásica","Salchicha frankfurter en trozos acompañada con papas fritas.",19.0,null,false,1],
  [43,8,"Salchipapa especial","Salchicha frankfurter, papas fritas y dos huevos.",26.0,null,false,2],
  [44,8,"Salchipapa regional","Salchicha, cecina, papas fritas, huevo y plátano maduro.",29.0,null,false,3],
  [45,8,"Chicharrón de pollo","Filete de pechuga en trozos, rebozado y acompañado de papas fritas.",26.0,null,false,4],
  [46,8,"Tequeños clásicos (10 unidades)","Rellenos de queso y jamón con salsa de guacamole.",18.0,null,false,5],
  [47,8,"Tequeños regionales (10 unidades)","Rellenos de cecina y calabresa con guacamole.",20.0,null,false,6],
  [48,8,"Canastas amazónicas","Cuatro patacones rellenos de cecina y calabresa con salsa de cocona.",17.0,null,false,7],
  [49,8,"Canastas con lomo al jugo","Cuatro patacones con lomito al jugo y salsa de cocona.",19.0,null,false,8],
  [50,8,"Alitas (6 unidades)","Incluye una salsa a elección: BBQ, acevichado, búfalo, anticuchera, Salvaje o maracuyá.",25.0,null,false,9],
  [51,8,"Alitas (10 unidades)","Incluye una salsa a elección: BBQ, acevichado, búfalo, anticuchera, Salvaje o maracuyá.",35.0,null,false,10],

  [52,9,"Toscana parrillero",null,25.0,null,false,1],
  [53,9,"Pollo canga",null,26.0,null,false,2],
  [54,9,"Tacacho con cecina",null,25.0,null,false,3],
  [55,9,"Tacacho con cecina + chorizo",null,29.0,null,false,4],
  [56,9,"Chaufa amazónico",null,34.0,null,false,5],
  [57,9,"Paco frito",null,35.0,null,false,6],
  [58,9,"Saltado de cecina",null,35.0,null,false,7],
  [59,9,"Ronda amazónica","Cecina, chancho, chaufa amazónico, tacacho y chorizo regional.",50.0,null,false,8],

  [60,10,"Lomo saltado",null,35.0,null,false,1],
  [61,10,"Lomo saltado a lo pobre",null,38.0,null,false,2],
  [62,10,"Tallarín saltado lomo fino",null,37.0,null,false,3],
  [63,10,"Tallarín saltado pollo",null,32.0,null,false,4],
  [64,10,"Chaufa de pollo",null,24.0,null,false,5],
  [65,10,"Chaufa especial",null,33.0,null,false,6],
  [66,10,"Saltado de pollo",null,29.0,null,false,7],
  [67,10,"Arroz con pato",null,null,null,false,8],
  [68,10,"Filete de pechuga","Papas fritas y ensalada.",24.0,null,false,9],
  [69,10,"Filete light","Filete de pechuga con ensalada especial.",27.0,null,false,10],
  [70,10,"Filete a lo pobre","Filete de pechuga, papas fritas, arroz, plátano y huevo frito.",29.0,null,false,11],
  [71,10,"Filete parrillero","Filete de pechuga, mollejitas, chorizo, papas fritas y ensalada.",32.0,null,false,12],
  [72,10,"Filete Salvaje","Filete de pechuga, queso, tocino, champiñones y jamón.",34.0,null,false,13],

  [73,11,"Parrilla personal","Bife brasilera, filete de pollo, anticucho, toscana y vaso de refresco.",60.0,null,false,1],
  [74,11,"Parrilla mediana","Bife brasilera, filete de pollo, chuleta de cerdo, anticuchos, chorizos y jarra de sangría.",140.0,null,false,2],
  [75,11,"Parrilla familiar","Bife brasilera, picaña, lomo fino, filetes de pollo, chuleta, anticuchos, chorizos y jarra de sangría.",220.0,null,false,3],
  [76,11,"Parrilla Salvaje","Bife brasilera, picaña, lomo fino, pollo, chuleta, anticuchos, chorizo, molleja y jarra de sangría.",300.0,null,false,4],

  [77,12,"Arroz",null,7.0,null,false,1],
  [78,12,"Papas fritas",null,10.0,null,false,2],
  [79,12,"Patacones",null,10.0,null,false,3],
  [80,12,"Papa dorada",null,10.0,null,false,4],
  [81,12,"Yucas fritas",null,10.0,null,false,5],
  [82,12,"Tacacho",null,10.0,null,false,6],

  [83,13,"Pisco Sour","Pisco, limón, jarabe de goma, clara de huevo y unas gotas de amargo de angostura.",null,null,false,1],
  [84,13,"Mojito","Ron, hierbabuena, limón, azúcar y soda, servido bien frío.",null,null,false,2],
  [85,13,"Margarita","Tequila, licor de naranja y limón, con borde de sal.",null,null,false,3],
  [86,13,"Cuba Libre","Ron, bebida de cola y limón.",null,null,false,4],

  [87,14,"Mojito virgen","Hierbabuena, limón, azúcar y soda.",null,null,false,1],
  [88,14,"San Francisco","Mezcla frutal de naranja, piña, limón y granadina.",null,null,false,2],
  [89,14,"Piña colada virgen","Piña y crema de coco, con textura cremosa.",null,null,false,3],
  [90,14,"Limonada de hierbabuena","Limón, hierbabuena y hielo.",null,null,false,4],

  [91,15,"Salvaje tropical","Una propuesta frutal de la casa. Completa aquí la receta oficial.",null,null,false,1],
  [92,15,"Maracuyá sour","Una versión cítrica y aromática con maracuyá. Confirma la receta de la barra.",null,null,false,2],
  [93,15,"Especial de temporada","Espacio para destacar una mezcla temporal o una recomendación del bartender.",null,null,false,3]
].map(([id_producto,id_categoria,nombre,descripcion,precio,informacion_adicional,destacado,orden_visualizacion]) => ({
  id_producto,
  id_categoria,
  nombre,
  descripcion,
  precio,
  imagen_url: null,
  informacion_adicional,
  disponible: true,
  destacado,
  activo: true,
  orden_visualizacion
}));

export const salsas = [
  {
    id_salsa: 1,
    nombre: "Al pesto",
    descripcion: "Salsa verde de albahaca, ajo, piñones, queso parmesano y aceite de oliva.",
    imagen_url: "/imagen/salsa_pesto.jpg",
    imagen_alt: "Salsa pesto verde con albahaca"
  },
  {
    id_salsa: 2,
    nombre: "A lo Alfredo",
    descripcion: "Salsa cremosa a base de mantequilla, crema de leche y queso parmesano.",
    imagen_url: "/imagen/salsa_alfredo.jpg",
    imagen_alt: "Salsa Alfredo cremosa"
  },
  {
    id_salsa: 3,
    nombre: "A la huancaína",
    descripcion: "Salsa peruana tradicional a base de ají amarillo y queso.",
    imagen_url: "/imagen/salsa_huancaina.jpg",
    imagen_alt: "Salsa huancaína amarilla"
  }
];

export const notasCarta = {
  carnes: "Elige tu corte favorito y el término de cocción que prefieras. Los tiempos pueden variar según el grosor de la carne.",
  comidas: "Ven y disfruta de nuestros delicios platos y la maravillosa experiencia.",
  bebidas: "Los nombres y recetas de ejemplo deben revisarse con la carta oficial antes de publicar. Los precios pueden añadirse debajo de cada bebida cuando estén confirmados."
};