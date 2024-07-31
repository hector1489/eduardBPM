
document.addEventListener('DOMContentLoaded', () => {
  cargarDatosDesdeLocalStorage();
  inicializarFiltros();
  obtenerTodasLasPreguntas();
  obtenerTodasLasAction();
});

// Definición de Arrays
const prioridades = [
  { valor: 'Leve', clase: 'prioridad-leve', dias: 45 },
  { valor: 'Moderado', clase: 'prioridad-moderada', dias: 30 },
  { valor: 'Crítico', clase: 'prioridad-critica', dias: 15 }
];

const estados = ['Cerrado', 'Abierto'];
const entidades = ['Entidad 1', 'Entidad 2'];
const responsablesDesviacion = ['Responsable 1', 'Responsable 2'];
const auditores = ['Auditor 1', 'Auditor 2'];
const criterio = ['No Cumple', 'Parcialmente', 'Cumple', 'Cumple Totalmente'];

const questions = [
  {
    module: 'infraestructura', question: [
      'Separaciones',
      'Equipos',
      'Servicios',
    ]
  },
  {
    module: 'legales', question: [
      'Trazabilidad',
      'Registros',
      'Correctiva',
      'Entrenamiento'
    ]
  },
  {
    module: 'quimicos', question: [
      'Almacenamiento',
      'Rotulacion',
      'Cantidad'
    ]
  },
  { module: 'Agua', question: 'Agua' },
  {
    module: 'superficies', question: [
      'Utensilios',
      'Higiene-tablas',
      'Desinfeccion-equipos',
      'Desengrasado-equipos',
      'Desincrustacion-maquinas',
      'Limpieza-mesas',
      'Higiene-programa',
      'Alarma-Sanitaria',
      'cs-registro',
      'cs-medidas',
      'Luminometro'
    ]
  },
  {
    module: 'contaminacion', question: [
      'Contaminacion-Utensilios',
      'Ubicacion-Equipos'
    ]
  },
  {
    module: 'adulterantes', question: [
      'Pulverizadores',
      'Proteccion-MP',
      'producto-mp',
    ]
  },
  {
    module: 'higiene', question: [
      'Uniformes',
      'Cubrepelo',
      'Lavado-Manos',
      'Manos-Heridas',
      'Examenes',
      'csh-programa'
    ]
  },
  {
    module: 'plagas', question: [
      'Barreras-Fisicas',
      'Programa-Plagas',
      'cp-programa',
      'cp-desechos'
    ]
  }, {
    module: 'instalaciones', question: [
      'Lavamanos',
      'Servicios-Higienicos'
    ]
  },
  {
    module: 'recepcion', question: [
      'Registro-Recepcion',
      'Balanza',
      'Tiempo-Exposicion',
      'materias-recepcion',
      'prima-recepcion'
    ]
  },
  {
    module: 'almacenamiento', question: [
      'Practicas-Higienicas',
      'Identificacion-Areas',
      'Receptaculos',
      'Fifo-Fefo',
      'Productos-No-Conforme',
      'Nivel-Piso',
      'Separacion-Materias',
      'Entrega-Produccion'
    ]
  },
  {
    module: 'pre-elaboraciones', question: [
      'Descongelacion',
      'Preelaborados',
      'Materias-Primas',
      'Separacion-Productos',
      'Manitizado'
    ]
  },
  {
    module: 'elaboraciones', question: [
      'Recepcion-Materias',
      'Orden-Limpieza',
      'Productos-Transito',
      'Pespetan-Temperaturas',
      'Uso-Equipos-Frio',
      'Sistema-Extraccion',
      'Estantes',
      'Especieros',
      'Montajes-Rapidos',
      'Tiempo-Elaboracion-Consumo'
    ]
  },
  { module: 'mantencion', question: 'control-tiempo-temperatura' },
  {
    module: 'transporte', question: [
      'Traslado-Alimentos',
      'Observacion-Vehiculo'
    ]
  },
  {
    module: 'servicio', question: [
      'Mantenimiento-Baño-Maria',
      'Variedad-Autoservicio',
      'Equipos-Suficientes',
      'Reposicion-Preparaciones',
      'Observacion-Vajilla'
    ]
  },
  {
    module: 'vajilla', question: [
      'Desconche',
      'Procedimiento-Higiene',
      'Orden-Area'
    ]
  },
  {
    module: 'control', question: [
      'Termometros-Balanzas',
      'Monitoreo-Controles',
      'Acciones-Correctivas',
      'Registro-Contramuestras'
    ]
  },
  {
    module: 'proteccion', question: [
      'Dosificacion',
      'Productos',
      'Basureros',
      'Retiro-Basura',
      'Limpieza-Area-Basura',
      'Manejo-Aceites',
      'Separacion-Residuos'
    ]
  },
  {
    module: 'poe-ppt', question: [
      'ppt-flujo',
      'ppt-cuenta',
      'ppt-almacenamiento',
      'ppt-distribucion',
      'ppt-envasado',
      'ppt-etiqueta'
    ]
  },
  {
    module: 'documentacion', question: [
      'Autorizaciones',
      'Libro-Inspeccion',
      'Informes-Microbio',
      'Informes-Auditoria',
      'Programa-Charlas',
      'Reporte-Proveedor',
      'Existe-programa',
      'Existe-capacitacion',
    ]
  },
]

const desviaciones = [
  '1-Gerente De Contrato',
  '2-Administrador',
  '3-Supervisor De Mantencion',
  '4-Supervisor De Casino',
  '5-Spervisor De Aseo',
  '6-Coordinador De Calidad',
  '7-Asesor SSO',
  '8-Asesor Medio Ambiente',
  '9-Jefe RH',
  '10-Bodeguero',
  '11-Chef'
];

const accionCorrectivas = [
  {
    question: 'Separaciones',
    action: [
      'SEPARAR VIRTUALMENTE AREA CALIENTE -AREA FRIA',
      'PONER PANELES DIVISORIOS',
      'DEFINIR FLUJOS OPERACIONALES',
      'REALIZAR MANTENCIÓN AL AREA Y HACER SEPARACIONES DEL AREA',
    ]
  },
  {
    question: 'Equipos',
    action: [
      'REVISAR CAPACIDAD DE EQUIPAMIENTO-USAR COCINAS A GAS Y CAMARAS DE FRIO',
      'COTIZAR EQUIPOS DE COCCION Y ENFRIAMIENTO',
      'COMPRAR EQUIPOS DE COCCION Y ENFRAIMIENTO',
      'REALIZAR LEVANTAMIENTO DE UN NUEVO FLUJO OPERACIONAL',
    ]
  },
  {
    question: 'Servicios',
    action: [
      'REALIZAR PLANILLA DE CONTROL DE CLORO',
      'INSTALACION DE DESAGUES',
      'INSTALAR CORTINAS DE AIRE',
      'INSTALAR CASILLEROS IDENTIFCADOS',
      'PROTEJER LAS LUMINARIAS',
      'LIMPIEZA DE LUMINARIAS'
    ]
  },
  {
    question: 'Trazabilidad',
    action: [
      'REALIZAR CHARLA DEL CORRECTO LLENADO DE REGISTROS',
      'IMPLEMENTAR FORMATO ADECUADO DE TRAZABILIDAD',
      'COLOCAR CARTA DE AMONESTACIÓN A RESPONSABLE DE AREA QUE NO CUMPLE',
      'COTIZAR TECNOLOGIA DE CONTROL DE PROCESOS'
    ]
  },
  {
    question: 'Registros',
    action: [
      'REALIZAR CHARLA DE COMO COMPLETAR LOS REGISTROS',
      'DEFINIR LUGAR DE ALMACENAMIENTO  DE LOS REGISTROS',
      'MANTER ORDEN DE LA DOCUMENTACIÓN',
      'EVITAR DOBLE ESTANDAR LLEVANDO CONTROL DE DOCUMENTOS'
    ]
  },
  {
    question: 'Correctiva',
    action: [
      'REALIZAR PROGRAMA DE MANTENCIÓN PREVENTIVA',
      'GENERAR ORDENES DE TRABAJO',
      'LLEVAR HOJA DE VIDA DE CADA EQUIPO',
      'CONTAR CON EL CONTROL DE EQUIPOS CRITICOS',
    ]
  },
  {
    question: 'Entrenamiento',
    action: [
      'REALIZAR INDUCCIÓN HOMBRE NIUEVO',
      'REALIZAR PROGRAMA DE CAPACITACIÓN',
      'MANTENER REGISTROS DE CAHRLAS JUNTO A EVALUACIONES DE PROCEDIMIENTOS',
      'REALIZAR PLANILLA DE SEGUIMIENTO DE CAPACITACIONES'
    ]
  },
  {
    question: 'Almacenamiento',
    action: [
      'SOLICITAR CAPACITACION DE QUIMICOS A PROVEEDOR',
      'DEFINIR ESTANTERIAS PARA ORDENAR POR PH',
      'IMPLEMENTAR ARCHIVADOR CON HOJAS DE SEGURIDAD',
      'DEFINIR LUGAR A PARTE PARA EPP'
    ]
  },
  {
    question: 'Rotulacion',
    action: [
      'PEDIR A PROVEEDOR DE QUIMICOS ROTULACIÓN',
      'SOLICITAR CAPACITACIÓN SOBRE ROTULACIÓN A PROVEEDOR DE QUIMICOS',
      'MANTENER ORDENADO SEGUN ROTULACIÓN',
      'HACER RECAMBIOS DE ROTULOS BORROSOS',
    ]
  },
  {
    question: 'Cantidad',
    action: [
      'COMPRAR UTENSILIOS DE ASEO POR COLORES PARA CADA AREA',
      'CAPACITAR AL PERSOSNAL SOBRE CONTAMINACIÓN CRUZADA',
      'PEDIR A MANTENCIÓN LA INSTALACIÓN DE LOS COLGADORES DE UTENSILIOS',
      'HACER RECAMBIOS DE UTENSILIOS DE ASEO'
    ]
  },
  {
    question: 'Agua',
    action: [
      'MANTENER PLANILLA DE CONTROL DE CLORO',
      'ARCCHIVAR ANALISIS DE CONTROL DE AGUA POTABLE 409',
      'ARCHIVAR RESOLUCION SANITARIA DE AGUA POTABLE O CAMIONES ALJIBES',
      'MANTENER PLANILLA DE REVISÓN DE LA CALIDAD DEL AGUA (TURBIEDAD, COLOR, OLOR)',
    ]
  },
  {
    question: 'Utensilios',
    action: [
      'REALIZAR CAPACITACIÓN PROCEDIMIENTO LIMPIESA Y SANITIZACIÓN',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIENTO',
      'APLICAR CON FRECUENCIA DIARIA LUMINOMETRIA',
      'REALIZAR CHECKLIST DE REVISIÓN DE UTENSILIOS',
      'PEDIR APOYO PRACTICO A PROVEEDOR DE QUIMICOS EN TEMAS DE LIMPIESA Y SANITIZACIÓN UTENSILIOS',
    ]
  },
  {
    question: 'Higiene-tablas',
    action: [
      'REALIZAR CAPACITACIÓN PROCEDIMIENTO LIMPIESA Y SANITIZACIÓN',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIENTO',
      'APLICAR CON FRECUENCIA DIARIA LUMINOMETRIA',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
      'PEDIR APOYO PRACTICO A PROVEEDOR DE QUIMICOS EN TEMAS DE LIMPIESA Y SANITIZACIÓN EQUIPOS',
    ]
  },
  {
    question: 'Desinfeccion-equipos',
    action: [
      'REALIZAR CAPACITACIÓN PROCEDIMIENTO LIMPIESA Y SANITIZACIÓN',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIENTO',
      'APLICAR CON FRECUENCIA DIARIA LUMINOMETRIA',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
      'PEDIR APOYO PRACTICO A PROVEEDOR DE QUIMICOS EN TEMAS DE LIMPIESA Y SANITIZACIÓN EQUIPOS',
    ]
  },
  {
    question: 'Desengrasado-equipos',
    action: [
      'PEDIR A PROVEEDOR DE QUIMICOS PROCEDIMIENTO DE DESENGRASAMIENTO',
      'IMPLEMENTAR CUBA DE DESENGRASADO',
      'COMPRAR QUIMICOS ESPECIALES PARA DESENGRASAR',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
    ]
  },
  {
    question: 'Desincrustacion-maquinas',
    action: [
      'PEDIR A PROVEEDOR DE QUIMICOS PROCEDIMIENTO DE RETIRO DE SARRO',
      'APLICAR PROGRAMA DE HIGIENE CON FRECUENCIA DE LAVADO',
      'COMPRAR QUIMICOS ESPECIALES PARA DESINCRUSTACIÓN',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
    ]
  },
  {
    question: 'Limpieza-mesas',
    action: [
      'PEDIR A PROVEEDOR DE QUIMICOS PROCEDIMIENTO DE RETIRO DE SARRO',
      'APLICAR PROGRAMA DE HIGIENE CON FRECUENCIA DE LAVADO',
      'COMPRAR QUIMICOS ESPECIALES PARA DESINCRUSTACIÓN',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
    ]
  },
  {
    question: 'Higiene-programa',
    action: [
      'PUBLICAR PROGRAMA DE HIGIENE',
      'CAPACITAR AL PERSONAL EN FRECUENCIA DE LIMPIEZA TERMINAL',
      'COMPRAR QUIMICOS ESPECIALES PARA DESINCRUSTACIÓN',
      'REALIZAR CHECKLIST DE REVISIÓN DE EQUIPOS',
    ]
  },
  {
    question: 'Alarma-Sanitaria',
    action: [
      'REALIZARCHECKLIST DE ALARMA SANITARIA',
      'REALIZAR CHARLA DE RESPONSABILIDAD DE LA ALARMA SANITARIA',
      'CAPACITAR A PERSONAL EN LA DETENCIÓN DE ACTIVIDADES CUANDO SUENA EL TIEMBRE SANITARIO',
      'IMPLEMENTAR TIMBRE SANITARIO',
    ]
  },
  {
    question: 'cs-registro',
    action: [
      'REALIZAR REGISTRO DE MONITOREO DE LIMPIEZAS',
      'CAPACITAR A PERSONAL EN PROGRAMA DE HIGIENE',
      'REALIZAR CHARLAS DEL CORRECTO LLENADO DE LOS REGISTROS',
      'SOLICITAR CAPACITACION EN USO DE QUIMICOS',
    ]
  },
  {
    question: 'cs-medidas',
    action: [
      'REALIZAR LUMINOMETRIA',
      'CAPACITAR A PERSONAL EN TEMAS DE CONTAMINACIÓN CRUZADA',
      'DESARROLLO DE PROCEDIMIENTO DE LIMPIEZA Y DESINFECCIÓN',
      'SOLICITAR CAPACITACION EN USO DE QUIMICOS',
    ]
  },
  {
    question: 'Luminometro',
    action: [

    ]
  },
  {
    question: 'Contaminacion-Utensilios',
    action: [
      'REALIZAR CHARLA DE CONTAMINACIÓN CRUZADA',
      'DEFINIR ESTANDARIZACION TABLAS DE COLORES',
      'COLOCAR BARRAS IMANTADAS PARA SEPARAR UTENSILIOS',
      'CARTA DE AMONESTACIÓN POR INCUMPLIMIENTOS',
      'REALIZAR SEPARACIONES POR COLORES DE LOS UTENSILIOS DE LAS AREA (CUCHILLOS)',
      'MANTENER UTENSILIOS EN WENCOS LIMPIOS Y SANITIZADOS',
    ]
  },
  {
    question: 'Ubicacion-Equipos',
    action: [
      'REALIZAR CHARLA DE CONTAMINACIÓN CRUZADA',
      'DEFINIR ESTANDARIZACION TABLAS DE COLORES',
      'COLOCAR BARRAS IMANTADAS PARA SEPARAR UTENSILIOS',
      'CARTA DE AMONESTACIÓN POR INCUMPLIMIENTOS',
      'REALIZAR SEPARACIONES POR COLORES DE LOS UTENSILIOS DE LAS AREA (CUCHILLOS)',
      'MANTENER UTENSILIOS EN WENCOS LIMPIOS Y SANITIZADOS',
    ]
  },
  {
    question: 'Pulverizadores',
    action: [
      'COMPRAR CANASTOS PARA ALMACENAR LOS P.Q',
      'INSTALAR REJILLAS PARA ALMACENAS',
      'REALIZAR CHARLA DE MANTENCIÓN DE PRODUCTOS QUIMICOS SEPARADOS DE LAS M.P',
      'COLOCAR CARTELERIA DE UBICACIÓN DE LOS P.Q',
    ]
  },
  {
    question: 'Proteccion-MP',
    action: [
      'REALIZAR CAPACITACIÓN Y EVALUACION PROCEDIMIENTO CONTROL DE PLAGAS',
      'REALIZAR CHECKLIST DE PROTECCION ANTES DE APLICAR LA FUMIGACIÓN ',
      'SUGERIR A PROVEEDOR CONTROL DE PLAGAS INSTRUCTIVO DE PROTECCIÓN DE EQUIPOS ANTES DE CONTROL DE PLAGAS',
      'REALIZAR CAPACITACIÓN DE LIMPIEZA Y DESINFECCION DE EQUIPOS DESPUES DE LA APLICAION FUMIGACION',
    ]
  },
  {
    question: 'producto-mp',
    action: [
      'COMPRAR CANASTOS PARA ALMACENAR LOS P.Q',
      'INSTALAR REJILLAS PARA ALMACENAS',
      'REALIZAR CHARLA DE MANTENCIÓN DE PRODUCTOS QUIMICOS SEPARADOS DE LAS M.P',
      'COLOCAR CARTELERIA DE UBICACIÓN DE LOS P.Q',
    ]
  },
  {
    question: 'Uniformes',
    action: [
      'REALIZAR CHECKLIST DE HIGIENE DE PERSONAL',
      'REALIZAR PLANILLA DE RECAMBIOS DE UNIFORMES',
      'CARTA DE AMONESTACION A PERSONAL QUE NO CUMPLA CON LA HIGIENE',
      'REALIZAR CAPACITACIÓN DE HIGIENE PERSONAL',
    ]
  },
  {
    question: 'Cubrepelo',
    action: [
      'REALIZAR CHECKLIST DE HIGIENE DE PERSONAL',
      'REALIZAR PLANILLA DE RECAMBIOS DE UNIFORMES',
      'CARTA DE AMONESTACION A PERSONAL QUE NO CUMPLA CON LA HIGIENE',
      'REALIZAR CAPACITACIÓN DE HIGIENE PERSONAL',
      'REALIZAR CAPACITACIÓN DE BPM (INDUMENTARIA DE HIGIENE)',
    ]
  },
  {
    question: 'Lavado-Manos',
    action: [
      'REALIZARCHECKLIST DE ALARMA SANITARIA',
      'REALIZAR CHARLA DE TECNICA DE LAVADO DE MANOS',
      'REALIZAR CAMPAÑA DEL CORRECTO LAVADO DE MANOS',
      'IMPLEMENTAR TIMBRE SANITARIO',
    ]
  },
  {
    question: 'Manos-Heridas',
    action: [
      'REALIZAR CHECKLIST DE HIGIENE DE PERSONAL',
      'REALIZAR PLANILLA DE RECAMBIOS DE UNIFORMES',
      'CARTA DE AMONESTACION A PERSONAL QUE NO CUMPLA CON LA HIGIENE',
      'REALIZAR CAPACITACIÓN DE HIGIENE PERSONAL',
      'REALIZAR CAPACITACIÓN DE BPM (INDUMENTARIA DE HIGIENE)',
    ]
  },
  {
    question: 'Examenes',
    action: [
      'REALIZAR PLANILLA DE SEGUIMIENTO CONTROL DE EXAMENES CON ALERTAS',
      'REALIZAR CAPACITACIÓN DE CONTROL DE SALUD (EXAMENES)',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIENTO',
      'REALIZAR HOJA DE VIDA DE CADA MANIPULADOR Y SUS EXAMENES',
    ]
  },
  {
    question: 'csh-programa',
    action: [
      'REALIZAR PLANILLA DE SEGUIMIENTO CONTROL DE EXAMENES CON ALERTAS',
      'REALIZAR CAPACITACIÓN DE CONTROL DE SALUD (EXAMENES)',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIENTO',
      'REALIZAR HOJA DE VIDA DE CADA MANIPULADOR Y SUS EXAMENES',
    ]
  },
  {
    question: 'Barreras-Fisicas',
    action: [
      'ALMACENAR REGISTROS DE CONTROL DE PLAGAS',
      'IMPLEMENTAR TRAMPAS UV',
      'COLOCAR MALLAS PROTECTORAS EN VENTANAS',
      'COLOCAR LAMAS EN AREAS SI EXISTEN EXCESO DE PLAGAS',
      'COLOCAR CORTINAS DE AIRE EN SECTOR SALAS DE BASURA',
    ]
  },
  {
    question: 'Programa-Plagas',
    action: [
      'ALMACENAR REGISTROS DE CONTROL DE PLAGAS',
      'APLICAR AUDITORIA BPM',
      'REALIZAR CHECKLIST PARA CONTROL DE PLAGAS SEMANAL',
    ]
  },
  {
    question: 'cp-programa',
    action: [
      'ALMACENAR RESOLUCION SANITARIA DE EMPRESA CONTROL DE PLAGAS',
      'ALMACENAR CROQUIS CEBADERO',
      'MANTENER INFORMES DE CONTROL DE PLAGA',
    ]
  },
  {
    question: 'cp-desechos',
    action: [
      'CONTAR CON BATEAS PARA ELIMINACIÓN DE DESECHOS',
      'CONTAR CON FRECUENCIA DE LABADO LOZA DONDE SE MANYIENE LA BATEA',
      'MANTENER BOLSAS CON DESECHOS CERRADAS',
      'DEFINIR LA SEPARACION DE DESECHOS (DOMESTICOS, INDUSTRIALES, CARTONES)',
    ]
  },
  {
    question: 'Lavamanos',
    action: [
      'JEFE DE COCINA DEBE REALIZAR REVISION DIARIA DE INSUMOS PARA HIGIENE DE MANOS',
      'SOLICITAR A PROVEEDOR DE QUIMICOS REVISIÓN DE SEÑALETICAS PARA LAVAMANOS',
      'REALIZAR CAPACITACIÓN DE TECNICA LAVADO DE MANOS',
    ]
  },
  {
    question: 'Servicios-Higienicos',
    action: [
      'PERSONAL DE ASEO REALIZAR CHECKLIST DE INSUMOS EN LOS BAÑOS',
      'IMPLEMENTAR MONITOREO DE ASEO CON FRECUENCIA',
      'IDENTIFICAR CASILLEROS Y DEJAR CON CANDADOS',
    ]
  },
  {
    question: 'Registro-Recepcion',
    action: [
      'ALMACENAR REGISTROS DE RECEPCION DE M.P',
      'ALMACENAR IREGISTROS DE FACTURAS Y GUIAS DE DESPACHO',
      'IMPLEMENTAR PLATAFORMA DE CONTROL DE INVENTARIO Y ORDENES DE COMPRA',
    ]
  },
  {
    question: 'Balanza',
    action: [
      'REALIZAR VERIFICACIÓN DE BALANZAS',
      'IMPLEMENTAR CODIFICACIÓN',
      'INCLUIR EN PROGRAMA DE HIGIENE FRECUENCIA DE LIMPIEZA',
      'IMPLENTAR CON MANTENCIÓN REVISION PREVENTIVA DE BALANZA',
    ]
  },
  {
    question: 'Tiempo-Exposicion',
    action: [
      'REALIZAR CHECKLIST DE CONTROL DE TEMPERATURAS DE EQUIPOS DE FRIO',
      'IMPLEMENTAR TECNOLOGIA DE SENSORES DE TEMPERATURA CON ALARMA',
    ]
  },
  {
    question: 'materias-recepcion',
    action: [
      'ALMACENAR RESOLUCIONES SANOTARIAS DE LOS PROVEEDORES',
      'MANTENER FICHAS TECNICAS DE LAS M.PROVEEDORES',
      'REALIZAR CHECKLIST DE CONTROL ROTULACIONES',
      'REALIZAR AUDITORIAS A PROVEEDORES EXTERNOS',
    ]
  },
  {
    question: 'prima-recepcion',
    action: [
      'ALMACENAR REGISTROS DE RECEPCION DE M.P',
      'ALMACENAR IREGISTROS DE FACTURAS Y GUIAS DE DESPACHO',
      'IMPLEMENTAR PLATAFORMA DE CONTROL DE INVENTARIO Y ORDENES DE COMPRA',
    ]
  },
  {
    question: 'Practicas-Higienicas',
    action: [
      'REALIZAR IMPLEMENTACIÓN DE LAVADO DE WENCOS EN PROGAMA DE HIGIENE',
      'REALIZAR INSPECCIONES VISUALES DE  LA LIMIPEZA DE LOS ENVASES',
      'DEFINIR WENCOS DE COLORES PARA DIFERENTES PROTEICOS',
    ]
  },
  {
    question: 'Identificacion-Areas',
    action: [
      'IMPLEMENTAR SISTEMA DE ROTULACION POR FAMILIA SEGUN REGLAMENTO SANOTARIO',
      'IMPLEMENTAR ORDEN POR ABECEDARIO',
      'HACER SEPARACIONES EN ESTANTERIAS',
      'CHECKLIST DE CONTROL FIFO-FEFO',
      'REALIZAR CHECKLIST DE CONDICIONES DE ALMACENAMIENTO',
    ]
  },
  {
    question: 'Receptaculos',
    action: [
      'REALIZAR IMPLEMENTACIÓN DE LAVADO DE WENCOS EN PROGAMA DE HIGIENE',
      'REALIZAR INSPECCIONES VISUALES DE  LA LIMIPEZA DE LOS ENVASES',
      'DEFINIR WENCOS DE COLORES PARA DIFERENTES PROTEICOS',
    ]
  },
  {
    question: 'Fifo-Fefo',
    action: [
      'REALIZAR MANUAL DE ESPECIFICAIONES DE M.P',
      'REALIZAR CONTROL DE MUESTREOS NCH 44',
      'REALIZAR CONTROL VERIFICACIÓN ROTACION FIFO - FEFO',
      'REALIZAR REVISIONES DE FECHAS DDE VENCIMIENTO',
      'REVISAR ROTULACION',
    ]
  },
  {
    question: 'Productos-No-Conforme',
    action: [
      'IDENTIFICAR SECTOR DE PRODUCTO NO CONFORME',
      'REALIZAR RECLAMOS NO CONFORMES DE PRODUCTO',
      'REALIZAR PLANILLAS DE CONTROL DE DEVOLUCIÓN DE PRODUCTOS',
      'REALIZAR MATRIZ DE CONTROL DE PRODUCTOS NO CONFORMES',
    ]
  },
  {
    question: 'Nivel-Piso',
    action: [
      'REALIZAR CHARLA DE NO MANTENER PRODUCTOS EN EL PISO',
      'REALIZAR CHECKLIST REVISIÓN ALMACENAMIENTO CORRECTO DE ALIMENTOS NO A NIVEL DE PISO',
    ]
  },
  {
    question: 'Separacion-Materias',
    action: [
      'CONTAR CON ESTANTERIAS SEPARADAS E IDENTIFICADAS',
      'LLEVAR UN CONTROL ESCRITO DE N.A, Y QUIMICOS',
      'CONTAR CON JAULAS PARA PRODUCTOS QUIMICOS',
      'IMPLEMENTAR UN SECTOR DIFERENCIADO PARA MATERIAS PRIMAS',
    ]
  },
  {
    question: 'Entrega-Produccion',
    action: [
      'REALIAR REGISTRO DE PEDIDOS A BODEGA',
      'REALIZAR REGISTRO DE PEDIDO A BODEGA ADICIONAL ',
      'ARMAR CANASTAS PARA LAS AREAS SEGUN PEDIDOS',
      'REVISIÓN DIARIA  DE REQUISICIONES SEGUN MINUTA',
    ]
  },
  {
    question: 'Descongelacion',
    action: [
      'REALIZAR REGISTRO DE DESCONGELACIÓN',
      'ADICIONAR A CADA M.P ROTULACIÓN DE DESCONGELACIÓN',
      'SEPARAR EN ESTANTERIAS CARNES ROJAS -BLANZA Y PESCADOS',
      'IMPLEMETAR TIEMPOS DE DESCONGELACIÓN SEGUN TAMAÑO DE M.P'
    ]
  },
  {
    question: 'Preelaborados',
    action: [
      'REALIZAR CHECKLIST CONTROL DE CALIDAD M.P PREELABORADOS',
      'MANTENER RORULACION ADECUADA',
      'LLEVAR CONTROL FIFO-FEFO',
      'IDEFINIR UN SECTOR PARA PRODUCTOS NO CONFORMES',
    ]
  },
  {
    question: 'Materias-Primas',
    action: [
      'MANTENER ROTULACION CON FECHAS DE ELABORACIÓN-VENCIMIENTO Y HORA',
      'APLICAR ALMACENAMIENTO SEGUN PRODUCTOS LISTOS.PREELABORADOS Y CRUDOS',
      'REALIZAR INSPECCIÓN VISUAL DIARIA PARA CUMPLIMIENTO',
      'LEVANTAR NO CONFORMIDAD POR INCUMPLIMIIENTO',
    ]
  },
  {
    question: 'Separacion-Productos',
    action: [
      'DEFINIR A TRAVES DE CARTELERÍA SEPARACIÓN UTENSILIOS, PRODUCTOS, TABLAS',
      'COMPRAR ATRILES PARA TABLAS, BARRAS IMANTADAS PARA UTENSILIOS, DEPOSITOS PLASTICOS PARA EPP',
      'REALIZAR INSPECCIÓN VISUAL DIARIA PARA CUMPLIMIENTO',
      'COLOCAR CANASTILLOS PARA PRODUCTOS QUIMICOS Y MATERIALES DE ASEO',
    ]
  },
  {
    question: 'Manitizado',
    action: [
      'SOLICITAR A PROVEEDOR DE QUIMICOS CINTAS DE MEDICIÓN PARA CONCENTRACIÓN',
      'IMPLEMENTAR REGISTROS DE CONTROL DE LAS CONCENTRACIONES',
      'CAPACITAR AL PERSONAL EN LA CORRECTA APLICAION DE LAS CONCENTRACIONES',
      'IMPLEMENTAR DILUTORES AUTOMATICOS',
    ]
  },
  {
    question: 'Recepcion-Materias',
    action: [
      'CONTAR CON TAPAS PARA TODAS LAS GASTRONORM',
      'HACER CHARLA A PERSONAL SOBRE PROTEGER LOS ALIMENTOS',
      'MANTENER RORULACION PARA CADA ELABORACIÓN',
      'REALIZAR INSPECCIÓN VISUAL PARA CUMPLIMIENTO',
    ]
  },
  {
    question: 'Orden-Limpieza',
    action: [
      'CONTAR CON TERMOGRAFOS EN CADA EQUIPO DE FRIO',
      'REALIZAR REGISTRO DE CONTROL DE T° CON CIERTA FRECUENCIA',
      'IMPLEMENTAR EN PROGRAMA DE HIGIENE FRECUENCIA DE LAVADO DE EQUIPOS DE FRIO',
      'IMPLEMENTAR REGISTRO DE MONITOREO Y VERIFICACIÓN DE LIMPIEZA',
    ]
  },
  {
    question: 'Productos-Transito',
    action: [
      'REALIZAR Y PUBLICAR TABLA DE PERECIBILIDAD',
      'COLOCAR ROTULACIÓN DE PRODUCTOS EN TRANSITO DEFINIR COLOR',
      'DESIGNAR LUGAR DE ALMACENAMIENTO PRODUCTOS EN TRANSITO',
      'DEFINIR PERMANENCIA DE PRODUCTOS EN TRANSITO PARA LAS AREAS DE PRODUCCION',
    ]
  },
  {
    question: 'Pespetan-Temperaturas',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES  CONTROL DE TEMPERATURA',
      'CARTA DE AMONESTACIÓN PARA PERSONAL QUE NO CONTROLE T°',
      'CAPACITACIÓN AL PERSONAL EN TEMAS DE T° ZONA DE PELIGRO',
      'SOLICITAR CONTROLES DE PROCESO EN LA DEGUSTACIÓN PARA TRAZABILIDAD',
    ]
  },
  {
    question: 'Uso-Equipos-Frio',
    action: [
      'LLEVAR REGISTROS DE CONTROL DE T° PARA MANTENEDORES-EQUIPOS DE FRIO',
      'IMPLEMENTAR TERMOCUPLAS PARA CONTROL COCCIÓN',
      'CAPACITACIÓN AL PERSONAL EN TEMAS DE USO DE EQUIPOS O PEDIR A PROVEEDOR DE EQUIPAMIENTO',
      'CAPACITACIÓN EN EL USO DE ESTOS',
      'REALIZAR ANALISIS DE CAPACIDAD DE LOS EQUIPOS PARA COMPRAS DE MAS EQUIPAMIENTO',
    ]
  },
  {
    question: 'Sistema-Extraccion',
    action: [
      'INCLUIR EN PROGRAMA DE MANTENCIÓN DUCTOS',
      'COTIZAR EMPRESA QUE REALICE LI,PIEZA DE DUCTOS',
      'DEFINIR FRECUENCIA DE LIMPIEZA TRIMESTRAL O SEMESTRAL',
    ]
  },
  {
    question: 'Estantes',
    action: [
      'IMPLEMENTAR EN PROGRAMA DE HIIGIENE LIMPIEZA DE ESTANTERIAS',
      'DEFINIR CANTIDAD DE PESO POR REPISA SEGÚN AREA PREVENCIÓN',
      'HACER SEPARACIONES SEGUN CARTELERÍA',
      'SOLICITAR A PROVEEDOR DE QUIMICOS CPACITACION RETIRO DE OXIDO',
    ]
  },
  {
    question: 'Especieros',
    action: [
      'COMPRAR ESPECIEROS PARA ORDENAR',
      'MANTENER ROTULACIÓN SEGUN TABLA DE PERECIBILIDAD',
      'HIMPLEMENTAR FRECUENCIA DE LAVADO EN PROGRAMA DE HIGIENE',
    ]
  },
  {
    question: 'Montajes-Rapidos',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES',
      'CARTA DE AMONESTACIÓN PARA PERSONAL QUE NO CONTROLE T°',
      'CAPACITACIÓN AL PERSONAL EN TEMAS DE T° ZONA DE PELIGRO',
      'SOLICITAR CONTROLES DE PROCESO EN LA DEGUSTACIÓN PARA TRAZABILIDAD',
    ]
  },
  {
    question: 'Tiempo-Elaboracion-Consumo',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES  CONTROL DE TIEMPO',
      'CARTA DE AMONESTACIÓN PARA PERSONAL QUE NO CONTROLE TIEMPOS',
      'CAPACITACIÓN AL PERSONAL EN TEMAS DE CONDICIONES DE LOS M.O',
      'SOLICITAR CONTROLES DE PROCESO EN LA DEGUSTACIÓN PARA TRAZABILIDAD',
    ]
  },
  {
    question: 'control-tiempo-temperatura',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES  CONTROL DE TIEMPO  Y TEMPERATURA',
      'CARTA DE AMONESTACIÓN PARA PERSONAL QUE NO CONTROLE TIEMPOS Y T°',
      'CAPACITACIÓN AL PERSONAL EN TEMAS DE CONDICIONES DE LOS M.O',
      'SOLICITAR CONTROLES DE PROCESO EN LA DEGUSTACIÓN PARA TRAZABILIDAD',
    ]
  },
  {
    question: 'Traslado-Alimentos',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES  CONTROL DE TIEMPO  Y TEMPERATURA',
      'REALIZAR CHECKLIST DE CONDICIONES DE TRASLADO DE ALIMENTOS',
      'REALIZAR REGISTROS DE TRASLADO DE ALIMENTOS (SALIDA-LLEGADA)',
      'REVISIÓN DE ROTULACIÓN PARA LOS TRASLADOS',
    ]
  },
  {
    question: 'Observacion-Vehiculo',
    action: [
      'COTIZAR SISTEMA DE SENSORES PARA PREPARACIONES  CONTROL DE TIEMPO  Y TEMPERATURA',
      'REALIZAR CHECKLIST DE CONDICIONES DE TRASLADO DE ALIMENTOS',
      'REALIZAR REGISTROS DE TRASLADO DE ALIMENTOS (SALIDA-LLEGADA)',
      'REVISIÓN DE ROTULACIÓN PARA LOS TRASLADOS',
      'ARCHIVAR RESOLUCIÓN SANITARIA DE LOS VEHICULOS DE TRANSPORTE',
    ]
  },
  {
    question: 'Mantenimiento-Baño-Maria',
    action: [
      'REALIZAR PROGRAMA DE MANTENCIÓN PREVENTIVA',
      'REALIZAR LISTADO DE EQUIPOS CRITICOS',
      'CONTAR CON UN SECTOR COMO PAÑON PARA REPUESTOS',
      'CONTAR CON HOJA DE VIDA PARA LOS EQUIPOS CRITICOS',
    ]
  },
  {
    question: 'Variedad-Autoservicio',
    action: [
      'REVISAR REQUISICIONES EN DEGUSTACIÓN',
      'REALIZAR PLANILLA DE SEGUIMIENTO CUMPLIMIENTO DE MINUTA',
      'CONTAR CON CAMBIO DE MENU PARA INFORMAR AL CLIENTE',
      'REVISAR RECEPCIÓN DE MATERIAS PRIMAS',
      'CONTROL DE LOS INVENTARIOS',
      'LLEVAR PEDIDOS ADICIONALES',
      'REALIZAR RECLAMOS O NC A PROVEEDORES O BODEGA CENTRALIZADA POR INCUMPLIMIENTOS',
      'REVISAR MENU SEGÚN LO REQUERIDO POR EL CLIENTE',
    ]
  },
  {
    question: 'Equipos-Suficientes',
    action: [
      'REALIZAR PROGRAMA DE MANTENCIÓN PREVENTIVA',
      'REALIZAR LISTADO DE EQUIPOS CRITICOS',
      'CONTAR CON UN SECTOR COMO PAÑON PARA REPUESTOS',
    ]
  },
  {
    question: 'Reposicion-Preparaciones',
    action: [
      'DETERMINACIÓN DE RENDIMIENTO PERSONAL',
      'PUBLICAR FUNCIONES DEL PERSONAL',
      'CAPACITAR A LA LINEA DE MANDO MEDIA EN TEMAS DE SERVICIO',
    ]
  },
  {
    question: 'Observacion-Vajilla',
    action: [
      'REALIZAR CONTROL DE INVENTARIO SEMANAL',
      'CUMPLIR CON % DE 1.6 SOBRE LA BASE DE LOS COMENSALES',
      'CAPACITAR EN LIMPIEZA Y DESINFECCION DE CUBIERTOS',
      'COMPRAR MAQUINA ABRILLANTADORA DE CUBIERTOS',
      'HACER MANTENCIÓN A TERMOS PARA LA CORRECTA T° DE LAVADO',
    ]
  },
  {
    question: 'Desconche',
    action: [
      'DEFINIR  Y PUBLICAR FLUJO OPERACIONAL ZONA LIMPIA-SUCIO',
      'CALCULAR RENDIMIENTO PARA CUMPLIR CON EL CORRECTO LAVADO',
      'CAPACITAR EN LIMPIEZA Y DESINFECCION DE OLLAS',
      'PEDIR A PROVEEDOR DE QUIMICOS EN APOYO RECUPERACION OLLAS.LOCHERAS, ETC',
      'CAPACITAR A PERSONAL EN USO DE QUIMICOS ADECUADOS',
    ]
  },
  {
    question: 'Procedimiento-Higiene',
    action: [
      'COLOCAR LAVADERO O CUBA PARA SANITIZACIÓN',
      'PUBLICAR FLUJO OPERACIONAL',
      'CAPACITAR EN LIMPIEZA Y DESINFECCION DE VAJILLAS Y UTENSILIOS',
      'PEDIR A PROVEEDOR DE QUIMICOS EN APOYO RECUPERACION VAJILLA Y UTENSILIOS, ETC',
      'CAPACITAR A PERSONAL EN USO DE QUIMICOS ADECUADOS',
    ]
  },
  {
    question: 'Orden-Area',
    action: [
      'COMPRAR MAQUINA LAVAVAJILLAS',
      'PUBLICAR FLUJO OPERACIONAL',
      'CAPACITAR EN LIMPIEZA Y DESINFECCION DE VAJILLAS Y UTENSILIOS',
      'DEFINIR ESTANTERIAS PARA EL ORDEN',
      'IMPLEMENTAR SECTOR DE EPP-QUIMICOS-UTENSILIOS-MATERIALES, ETC',
    ]
  },
  {
    question: 'Termometros-Balanzas',
    action: [
      'CODIFICAR INSTRUMENTOS PARA CADA AREA',
      'LLEVAR REGISTROS DE VERIFICACIÓN DE LOS INSTRUMENTOS',
      'TENER DEPOSITOS DE ALMACENAMIENTO PARA INSTRUMENTOS',
      'DAR DE BAJA INSTRUMENTOS FUERA DE RANGO DE PRESICIÓN',
      'IMPLEMENTAR REGISTRO DE LISTADO EQUIPOS INPECCION Y ENSAYOS (EIME)',
      'REALIZAR REGISTRO DE CONTROL DE ENTREGA DE INSTRUMENTOS',
    ]
  },
  {
    question: 'Monitoreo-Controles',
    action: [
      'SOLICITAR REGISTROS DE CONTROLES DE PROCESO EN DEGUSTACIÓN',
      'CARTAS DE AMONESTACIÓN POR INCUMPLIMIENTO MAL LLENADO DE REGISTROS',
      'CAPACITAR A PERSONAL EN EL CORRECTO LLENADO DE REGISTROS',
      'REALIZAR PLANILLA DE CONTROL DE PROCESOS',
    ]
  },
  {
    question: 'Acciones-Correctivas',
    action: [
      'SOLICITAR REGISTROS DE CONTROLES DE PROCESO EN DEGUSTACIÓN',
      'CARTAS DE AMONESTACIÓN POR INCUMPLIMIENTO MAL LLENADO DE REGISTROS Y TOMA DE ACCIONES CORRECTIVAS',
      'CAPACITAR A PERSONAL EN EL CORRECTO LLENADO DE REGISTROS',
      'REALIZAR PLANILLA DE CONTROL DE PROCESOS',
    ]
  },
  {
    question: 'Registro-Contramuestras',
    action: [
      'REALIZAR REGISTRO REVISIÓN CONTROL DE CONTRAMUESTRAS',
      'CARTAS DE AMONESTACIÓN POR INCUMPLIMIENTO DE GRAMAJES Y NO REALIZAR REGISTRO',
      'CAPACITAR A PERSONAL EN TEMAS DE CONTRAMUESTRAS',
      'REALIZAR PLANILLA DE CONTROL DE PROCESOS',
    ]
  },
  {
    question: 'Dosificacion',
    action: [
      'SOLICITAR A PROVEEDOR DE QUIMICOS CAPACITACION DE DILUCIONES',
      'IMPLEMENTAR DILUTORES AUTOMATICOS',
      'LLEVAR PLANILLA DE CONTROL PARA DILUCIONES MANUALES',
    ]
  },
  {
    question: 'Productos',
    action: [
      'ARCHIVAR AUTORIZACIÓN SANITARIA DE EMPRESA DE QUIMICOS',
      'SOLICITAR A PROVEEDOR DE QUIMICOS PROGRAMA DE VISITA',
      'SOLICITAR PROGRAMA DE CAPACITACIÓN PARA USO DE QUIMICOS',
      'ARCHIVAR INFORME DE VISITA Y TOMAR ACCIONES CORRECTIVAS  DE LAS DESVIACIONES LEVANTADAS',
    ]
  },
  {
    question: 'Basureros',
    action: [
      'IMPLEMENTAR EN PROGRAMA DE HIGIENE LA LIMPIEZA Y SANITIZACION DE BASUREROS',
      'COMPRAR BASUREROS CON PEDAL',
      'HACER CHARLA EN CAPACIDAD DE LLENADO DE LAS BOLSAS',
      'RETIRO DE BASURA POR PERSONAL DE ASEO',
    ]
  },
  {
    question: 'Retiro-Basura',
    action: [
      'IMPLEMENTAR EN PROGRAMA DE HIGIENE LA LIMPIEZA Y SANITIZACION DE BASUREROS',
      'COMPRAR BASUREROS CON PEDAL',
      'HACER CHARLA EN CAPACIDAD DE LLENADO DE LAS BOLSAS',
      'RETIRO DE BASURA POR PERSONAL DE ASEO',
      'DEFINIR FRECUENCIA DE RETIRO DE BASURA',
    ]
  },
  {
    question: 'Limpieza-Area-Basura',
    action: [
      'IMPLEMENTAR EN PROGRAMA DE HIGIENE LA LIMPIEZA Y SANITIZACION DE SALA DE BASURA',
      'PEDIR A PROVEEDOR DE QUIMICO USO DE QUIMICOS PARA EL CORRECTO LAVADO DE LAS SALAS DE BASURA',
      'HACER CHARLA MEDIO AMBIENTAL NO TIRAR BASURA A CANALETAS',
      'DEFINIR FRECUENCIA DE LAVADO SALA DE BASURA',
    ]
  },
  {
    question: 'Manejo-Aceites',
    action: [
      'CONTAR CON UNA EMPRESA DE RETIRO DE ACEITES',
      'DEFINIR UN LUGAR DE ALMACENBAMIENTO',
      'HACER CHARLA MEDIO AMBIENTAL SOBRE EL MANEJO DE ACEITES',
      'MANTENER ADECUADA ROTULACION EN LOS ENVASES',
    ]
  },
  {
    question: 'Separacion-Residuos',
    action: [
      'IMPLEMENTAR COLADORES PARA SEPARAR LOS SOLIDOS DE LAS GRASAS',
      'COLOCAR FILTROS DE SOLIDOS EN LAS CANALETAS',
      'HACER CHARLA MEDIO AMBIENTAL SOBRE LA ELIMINACION DE RESIDUOS',
      'DEFINIR ELIMINACION DE RESIDUOS SOLIDOS DIRECTO A  BASUREROS',
    ]
  },
  {
    question: 'ppt-flujo',
    action: [
      'REALIZAR FLUJOS OPERACIONALES DE PERSONAL, DESECHOS.  PRODUCTOS Y VEHICULOS',
      'CAPACITAR AL PERSONAL EN LOS FLUJOS OPERACIONALES',
      'PUBLICAR LOS FLUJOS OPERACIONALES',
    ]
  },
  {
    question: 'ppt-cuenta',
    action: [
      'MANTENER ARCHIVADOS LOS PROCEDIMIENTOS',
      'REALIZAR PROGRAMA DE CAPACITACION DE LOS PROCEDIMIENTOS DE LOS PROCESOS',
      'CAPACITAR DE FORMA CONSTANTE LOS PROCEDIMIENTOS DE LOS PROCESO',
    ]
  },
  {
    question: 'ppt-almacenamiento',
    action: [
      'CUMPLIR PROGRAMA DE HIGIENE',
      'REALIZAR PROGRAMA DE HIGIENE',
      'REALIZAR REGISTRO DE MONITOREO Y VERIFICACIÓN DE ASEO',
      'CARTAS DE AMONESTACIÓN POR INCUMPLIMIENTO',
    ]
  },
  {
    question: 'ppt-distribucion',
    action: [
      'REVISAR A TRAVES DE CHECKLIST LA LIMPIEZA DE LAS CAMIONETAS',
      'REALIZAR INSPECCIÓN VISUAL DE LOS VEHICULOS',
      'ARCHIVAR RESOLUCIÓN SANITARIA DE LOS VEHICULOS',
      'REVISAR DOCUMENTOS DE LA MANTENCIÓN DE LOS VEHICULOS',
    ]
  },
  {
    question: 'ppt-envasado',
    action: [
      'COMPRAR TAPAS CON SELLADO AL VACIO',
      'ORDENAR LA ESTIBA DE LOS ALIMENTOS',
      'COLOCAR PALLET O WENCOS PARA EVITAR TENER ALIMENTOS AL PISO',
      'CONTROLAR TEMPERATURA INICIAL DEL VEHICULO',
    ]
  },
  {
    question: 'ppt-etiqueta',
    action: [
      'COMPRAR ROTULADORA ZEBRA',
      'REALIZAR ETIQUETAS SEGUN ART. 107',
      'CAPACITACR A PERSONAL EN TEMAS DE ROTULACIÓN',
      'CARTAS DE AMONESTACIÓN POR INCUMPLIMIENTO',
    ]
  },
  {
    question: 'Autorizaciones',
    action: [
      'ARCHIVAR RESOLUCIONES SANITARIAS',
      'DEFINIR LUGAR DE UBICACIÓN DE LA DOCUMENTACIÓN SEREMI',
    ]
  },
  {
    question: 'Libro-Inspeccion',
    action: [
      'ARCHIVAR VISITAS DEL SEREMI',
      'DEFINIR LUGAR DE UBICACIÓN DE LA DOCUMENTACIÓN SEREMI',
    ]
  },
  {
    question: 'Informes-Microbio',
    action: [
      'ARCHIVAR ANALISIS MICROBIOLOGICOS DE FORMA DIGITAL',
      'MANTENER PLANILLA DE CONTROL DE ANALISIS MIRCOBIOLOGICOS',
      'REALIZAR PLAN DE ACCIÓN DE LAS DESVIACIONES',
      'ARCHIIVAR DIGITALMENTE REMUESTREOS DESPUES DE TRATAMIENTOS',
    ]
  },
  {
    question: 'Informes-Auditoria',
    action: [
      'ARCHIVAR AUDITORIAS, INSPECCIONES DE FORMA DIGITAL',
      'REALIZAR CONSOLIDADO DE PLANES DE ACCIÓN',
      'REALIZAR ESTADISTICA DE AVANCES DE CIERRES DE PLANES DE ACCIÓN',
    ]
  },
  {
    question: 'Programa-Charlas',
    action: [
      'ARCHIVAR CHARLAS Y CAPACITACIONES DE CALIDAD  Y MEDIO AMBIENTE',
      'REALIZAR PLANILLA DE SEGUIMIENTO CAPACAITACIÓN',
      'REALIZAR ESTADISTICA DE CUMPLIMIENTO DE CAPACITACIONES',
    ]
  },
  {
    question: 'Reporte-Proveedor',
    action: [
      'SOLICITAR A PROVEEDOR DE QUIMICOS LOS REPORTES DE VISITA',
      'MANTENER DE FORMA DIGITAL REPORTES DE PROVEEDOR DE QUIMICOS',
    ]
  },
  {
    question: 'Existe-programa',
    action: [
      'ARCHIVAR CHARLAS Y CAPACITACIONES DE CALIDAD  Y MANIPULACION HIGIENICA',
      'REALIZAR PLANILLA DE SEGUIMIENTO CAPACAITACIÓN',
      'REALIZAR ESTADISTICA DE CUMPLIMIENTO DE CAPACITACIONES',
    ]
  },
  {
    question: 'Existe-capacitacion',
    action: [
      'ARCHIVAR CHARLAS Y CAPACITACIONES DE ASEO EN TECNICAS DE LIMPIEZA',
      'REALIZAR PLANILLA DE SEGUIMIENTO CAPACAITACIÓN',
      'REALIZAR ESTADISTICA DE CUMPLIMIENTO DE CAPACITACIONES',
    ]
  },

];

//obtener preguntas por modulo
function obtenerTodasLasPreguntas() {
  let todasLasPreguntas = [];
  questions.forEach(modulo => {
    if (Array.isArray(modulo.question)) {
      todasLasPreguntas = todasLasPreguntas.concat(modulo.question);
    } else {
      todasLasPreguntas.push(modulo.question);
    }
  });
  return todasLasPreguntas;
}

//obtener todas las actions
function obtenerTodasLasAction() {
  let todasLasAction = [];
  accionCorrectivas.forEach(question => {
    if (Array.isArray(question.action)) {
      todasLasAction = todasLasAction.concat(question.action);
    } else {
      todasLasAction.push(question.action);
    }
  });
  return todasLasAction;
}


// cargar datos desde localStorage y agregarlos a la tabla de desviaciones
function cargarDatosDesdeLocalStorage() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  const datos = JSON.parse(localStorage.getItem('tablaDatos'));
  if (datos) {
    datos.forEach(dato => agregarFilaConDatos(dato));
  }
}

// datos details desde localStorage
function loadTableDetails() {
  const tableId = 'tabla-details';
  const data = JSON.parse(localStorage.getItem(`tablaDatos-${tableId}`));

  if (!data) {
    console.log('No se encontraron datos en localStorage para la tabla especificada.');
    return;
  }

  data.forEach(rowData => {

    if (rowData[`columna4`]) {
      const id = rowData[`idColumna4`];
      if (id) {
        const idPart = id.replace('observacion-', '');

        const match = questions.find(module =>
          Array.isArray(module.question)
            ? module.question.find(q => q.toLowerCase() === idPart.toLowerCase())
            : module.question.toLowerCase() === idPart.toLowerCase()
        );

        if (match) {
          agregarFilaDesdeID(id);
        } else {
          console.log(`No se encontró acción para el ID ${id}`);
        }
      }
    }
  });

}

// Agregar una fila a la tabla de desviaciones con datos del ID
function agregarFilaDesdeID(id) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  const idPart = id.replace('observacion-', '');
  const match = questions.find(module =>
    Array.isArray(module.question)
      ? module.question.find(q => q.toLowerCase() === idPart.toLowerCase())
      : module.question.toLowerCase() === idPart.toLowerCase()
  );

  if (match) {

    fila.appendChild(crearCelda(tabla.rows.length + 1));
    fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasPreguntas(match.question[0])));

    fila.appendChild(crearCeldaConSelect(criterio, ''));
    fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));

    const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
    prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
    fila.appendChild(prioridadCelda);

    const estadoCelda = crearCeldaConSelect(estados, estados[0]);
    estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
    fila.appendChild(estadoCelda);

    fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasAction('')));
    fila.appendChild(crearCeldaConInput('   /   /   '));
    fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
    fila.appendChild(crearCeldaConInput('   /   /   '));
    fila.appendChild(crearCeldaConInput('', crearComboBoxCantidadDeDias('')));

    fila.appendChild(crearCeldaConSelect(entidades, entidades[0]));
    fila.appendChild(crearCeldaConSelect(responsablesDesviacion, responsablesDesviacion[0]));
    fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));

    fila.appendChild(crearCeldaConInput(''));
    fila.appendChild(crearCeldaConInput(''));
    fila.appendChild(crearCeldaConInput('   /   /   '));

    // Foto
    fila.appendChild(crearCeldaConInputFoto());

    // Eliminar
    const celdaEliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.addEventListener('click', function () {
      eliminarFila(fila);
    });
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    tabla.appendChild(fila);
    actualizarFiltros();
  } else {
    console.log(`No se encontró una pregunta para el ID ${id}`);
  }
}

// agregar fila con datos desde localStorage
function agregarFilaConDatos(dato) {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  const prioridadSeleccionada = prioridades.find(p => p.valor === dato.prioridad);
  if (prioridadSeleccionada) {
    fila.className = prioridadSeleccionada.clase;
  }

  fila.appendChild(crearCelda(dato.numeroPC));
  fila.appendChild(crearCelda(dato.numeroPregunta));
  fila.appendChild(crearCelda(dato.criterio));
  fila.appendChild(crearCelda(dato.desviacion));

  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), dato.prioridad);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  const estadoCelda = crearCeldaConSelect(estados, dato.estado);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput(dato.planAccion, crearComboBoxTodasLasAction(dato.planAccion)));
  fila.appendChild(crearCelda(dato.fechaCambioEstado));
  fila.appendChild(crearCelda(dato.fechaRecepcionSolicitud));
  fila.appendChild(crearCelda(dato.fechaSolucionProgramada));
  fila.appendChild(crearCeldaConInput(dato.cantidadDias, crearComboBoxCantidadDeDias(dato.cantidadDias)));

  fila.appendChild(crearCeldaConSelect(entidades, dato.entidad));
  fila.appendChild(crearCeldaConSelect(responsablesDesviacion, dato.responsableDesviacion));
  fila.appendChild(crearCeldaConSelect(auditores, dato.auditor));

  fila.appendChild(crearCeldaConInput(dato.contacto));
  fila.appendChild(crearCeldaConInput(dato.correo));
  fila.appendChild(crearCelda(dato.fechaUltimaModificacion));
  fila.appendChild(crearCeldaConInput(dato.foto));

  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  tabla.appendChild(fila);
  actualizarFiltros();
}


// crear una celda con texto
function crearCelda(texto) {
  const celda = document.createElement('td');
  celda.innerText = texto;
  return celda;
}

// crear una celda con un input
function crearCeldaConInput(valor, elemento) {
  const celda = document.createElement('td');
  if (!elemento) {
    elemento = document.createElement('input');
    elemento.type = 'text';
    elemento.className = 'form-control';
    elemento.value = valor;
  }
  celda.appendChild(elemento);
  return celda;
}

// crear una celda con un selectu
function crearCeldaConSelect(opciones, valorSeleccionado) {
  const celda = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'form-control';
  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    if (opcion === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  celda.appendChild(select);
  return celda;
}

// inicializar los filtros de la tabla
function inicializarFiltros() {
  const selects = document.querySelectorAll('.filter-select');
  selects.forEach(select => {
    select.addEventListener('change', function () {
      filtrarTabla();
    });
  });
  actualizarFiltros();
}

// filtrar la tabla basada en los filtros 
function filtrarTabla() {
  const table = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');
  const filters = document.querySelectorAll('.filter-select');
  for (let i = 0; i < rows.length; i++) {
    let showRow = true;
    for (let j = 0; j < filters.length; j++) {
      const cell = rows[i].getElementsByTagName('td')[j];
      const filterValue = filters[j].value;
      if (filterValue && cell.innerText !== filterValue) {
        showRow = false;
        break;
      }
    }
    rows[i].style.display = showRow ? '' : 'none';
  }
}

// Filtros a la cabecera de la tabla
function agregarFiltrosHead() {
  const tabla = document.getElementById('tabla-desviaciones');
  const thead = tabla.getElementsByTagName('thead')[0];
  const filaFiltro = document.getElementById('tr-filter');

  filaFiltro.innerHTML = '';

  filaFiltro.appendChild(crearCeldaConSelectNumeroTH(''));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxTodasLasPreguntasTH()));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxCriteriosTH('')));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxDesviacionesTH()));

  filaFiltro.appendChild(crearCeldaConSelectPrioridadTH());

  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  filaFiltro.appendChild(crearCeldaConSelectEstadoTH());

  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxTodasLasActionTH('')));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));
  filaFiltro.appendChild(crearCeldaConInputTH('', crearComboBoxCantidadDeDiasTH('')));

  filaFiltro.appendChild(crearCeldaConSelectEntidadTH(entidades, entidades[0]));
  filaFiltro.appendChild(crearCeldaConSelectResponsableTH(responsablesDesviacion, responsablesDesviacion[0]));
  filaFiltro.appendChild(crearCeldaConSelectAuditorTH(auditores, auditores[0]));

  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaTH(''));
  filaFiltro.appendChild(crearCeldaConInputFechaTH(''));

  // foto
  filaFiltro.appendChild(crearCeldaTH(''));

  //eliminar
  filaFiltro.appendChild(crearCeldaTH(''));

  thead.appendChild(filaFiltro);
}

//llamada a los filtros head
agregarFiltrosHead();

// Crea una celda con contenido
function crearCeldaTH(contenido) {
  const celda = document.createElement('th');
  celda.innerHTML = contenido;
  return celda;
}

// Crea una celda con un input
function crearCeldaConInputTH(valor, elemento) {
  const celda = document.createElement('th');
  if (!elemento) {
    elemento = document.createElement('input');
    elemento.type = 'text';
    elemento.className = 'form-control';
    elemento.value = valor;
  }
  celda.appendChild(elemento);
  return celda;
}

// Crea una celda con un inputNumero
function crearCeldaConSelectNumeroTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  for (let i = 1; i <= 1000; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }

  select.addEventListener('change', function () {
    filtrarPorNumero(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar por numeroInput
function filtrarPorNumero(numeroSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const numeroCelda = fila.getElementsByTagName('td')[0].innerText;

    if (numeroSeleccionado === '' || numeroCelda === numeroSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un combobox (select) con todas las acciones sin restricciones
function crearComboBoxTodasLasActionTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  select.id = 'select-actions';

  const optionDefault = document.createElement('option');
  optionDefault.value = '';
  optionDefault.text = 'Todas las Acciones';
  select.appendChild(optionDefault);

  const todasLasAcciones = accionCorrectivas.reduce((acciones, item) => {
    return acciones.concat(item.action);
  }, []);

  // Eliminar duplicados
  const accionesUnicas = [...new Set(todasLasAcciones)];

  accionesUnicas.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    if (action === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    filtrarPorAccion(event.target.value);
  });

  return select;
}

// Filtrar por acción
function filtrarPorAccion(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  filas.forEach(fila => {
    const celdaAccion = fila.cells[2];
    const valorCelda = celdaAccion ? celdaAccion.textContent.trim() : '';

    if (valorSeleccionado === '' || valorCelda.includes(valorSeleccionado)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}


// Crea un combobox (select) con todas las preguntas sin restricciones
function crearComboBoxTodasLasPreguntasTH(valorSeleccionado) {
  const preguntas = obtenerTodasLasPreguntas();
  const select = document.createElement('select');
  select.className = 'form-control';

  const optionDefault = document.createElement('option');
  optionDefault.value = '';
  optionDefault.text = 'Todas las Preguntas';
  select.appendChild(optionDefault);

  preguntas.forEach(pregunta => {
    const option = document.createElement('option');
    option.value = pregunta;
    option.text = pregunta;
    if (pregunta === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    filtrarPorPregunta(event.target.value);
  });

  return select;
}

// Filtrar por pregunta 
function filtrarPorPregunta(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  filas.forEach(fila => {
    const celdaPregunta = fila.cells[1];
    const valorCelda = celdaPregunta ? celdaPregunta.textContent.trim() : '';

    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// combo box de criterios
function crearComboBoxCriteriosTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  criterio.forEach(criterio => {
    const option = document.createElement('option');
    option.value = criterio;
    option.text = criterio;
    if (criterio === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });


  select.addEventListener('change', (event) => {
    filtrarPorCriterio(event.target.value);
  });

  return select;
}

// Filtrar por criterio
function filtrarPorCriterio(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  filas.forEach(fila => {
    const celdaCriterio = fila.cells[2];
    const valorCelda = celdaCriterio ? celdaCriterio.textContent.trim() : '';

    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}


// Crea un combobox (select) de desviaciones sin restricciones
function crearComboBoxDesviacionesTH(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';

  select.addEventListener('change', (event) => {
    filtrarPorDesviacion(event.target.value);
  });

  desviaciones.forEach(desviacion => {
    const option = document.createElement('option');
    option.value = desviacion;
    option.text = desviacion;
    if (desviacion === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Filtrar por desviacion
function filtrarPorDesviacion(valorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  filas.forEach(fila => {
    const celdaDesviacion = fila.cells[3];
    const valorCelda = celdaDesviacion.textContent.trim();

    if (valorSeleccionado === '' || valorCelda === valorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Crea un combobox (select) de cantidad de días sin restricciones
function crearComboBoxCantidadDeDiasTH(valorSeleccionado) {
  const dias = [10, 15, 30, 45];
  const select = document.createElement('select');
  select.className = 'form-control';

  dias.forEach(dia => {
    const option = document.createElement('option');
    option.value = dia;
    option.text = `${dia} días`;
    if (dia === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Crea un input de prioridad
function crearCeldaConSelectPrioridadTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  const prioridades = ['Leve', 'Moderado', 'Crítico'];
  prioridades.forEach(prioridad => {
    const option = document.createElement('option');
    option.value = prioridad;
    option.text = prioridad;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorPrioridad(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar por prioridad
function filtrarPorPrioridad(prioridadSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = Array.from(tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const prioridadCelda = fila.getElementsByTagName('td')[4].innerText;

    if (prioridadSeleccionada === '' || prioridadCelda === prioridadSeleccionada) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un input de Estado
function crearCeldaConSelectEstadoTH() {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  // Agregar opciones para Estado
  const estados = ['Abierto', 'Cerrado'];
  estados.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.text = estado;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorEstado(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar por estado
function filtrarPorEstado(estadoSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const estadoCelda = fila.getElementsByTagName('td')[6].innerText;

    if (estadoSeleccionado === '' || estadoCelda === estadoSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un input de fecha en la cabecera de la tabla
function crearCeldaConInputFechaTH(valor) {
  const celda = document.createElement('th');
  const inputFecha = document.createElement('input');
  inputFecha.type = 'date';
  inputFecha.className = 'form-control';
  inputFecha.value = valor;

  inputFecha.addEventListener('change', function () {
    filtrarPorFecha(inputFecha.value);
  });

  celda.appendChild(inputFecha);
  return celda;
}

// Filtrar filas por fecha
function filtrarPorFecha(fechaSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const fechaCelda = fila.getElementsByTagName('td')[9].innerText;
    const fechaCeldaDate = new Date(fechaCelda);
    const fechaFiltroDate = new Date(fechaSeleccionada);

    if (fechaCeldaDate.getTime() === fechaFiltroDate.getTime()) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un combobox (select) de entidades evaluadas
function crearCeldaConSelectEntidadTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorEntidad(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar filas por entidad evaluada
function filtrarPorEntidad(entidadSeleccionada) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const entidadCelda = fila.getElementsByTagName('td')[10].innerText;

    if (entidadCelda === entidadSeleccionada) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un combobox (select) de Responsable
function crearCeldaConSelectResponsableTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorResponsable(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar filas por responsable
function filtrarPorResponsable(responsableSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const responsableCelda = fila.getElementsByTagName('td')[11].innerText;

    if (responsableCelda === responsableSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}

// Crea un combobox (select) de Auditor
function crearCeldaConSelectAuditorTH(opciones) {
  const celda = document.createElement('th');
  const select = document.createElement('select');
  select.className = 'form-control';

  opciones.forEach(opcion => {
    const option = document.createElement('option');
    option.value = opcion;
    option.text = opcion;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    filtrarPorAuditor(select.value);
  });

  celda.appendChild(select);
  return celda;
}

// Filtrar filas por Auditor
function filtrarPorAuditor(auditorSeleccionado) {
  const tabla = document.getElementById('tabla-desviaciones');
  const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const auditorCelda = fila.getElementsByTagName('td')[12].innerText;

    if (auditorCelda === auditorSeleccionado) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  }
}



// Agregar una fila a la tabla de desviaciones
function agregarFila() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const fila = document.createElement('tr');

  fila.appendChild(crearCelda(tabla.rows.length + 1));
  fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasPreguntas('')));
  fila.appendChild(crearCeldaConSelect(criterio, ''));
  fila.appendChild(crearCeldaConInput('', crearComboBoxDesviaciones('')));

  const prioridadCelda = crearCeldaConSelect(prioridades.map(p => p.valor), prioridades[0].valor);
  prioridadCelda.querySelector('select').addEventListener('change', actualizarPrioridad);
  fila.appendChild(prioridadCelda);

  const estadoCelda = crearCeldaConSelect(estados, estados[0]);
  estadoCelda.querySelector('select').addEventListener('change', actualizarEstado);
  fila.appendChild(estadoCelda);

  fila.appendChild(crearCeldaConInput('', crearComboBoxTodasLasAction('')));
  fila.appendChild(crearCeldaConInput('   /   /   '));
  fila.appendChild(crearCelda(new Date().toLocaleDateString('es-ES')));
  fila.appendChild(crearCeldaConInput('   /   /   '));
  fila.appendChild(crearCeldaConInput('', crearComboBoxCantidadDeDias('')));

  fila.appendChild(crearCeldaConSelect(entidades, entidades[0]));
  fila.appendChild(crearCeldaConSelect(responsablesDesviacion, responsablesDesviacion[0]));
  fila.appendChild(crearCeldaConSelect(auditores, auditores[0]));

  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInput(''));
  fila.appendChild(crearCeldaConInput('   /   /   '));

  // foto
  fila.appendChild(crearCeldaConInputFoto());

  //eliminar
  const celdaEliminar = document.createElement('td');
  const botonEliminar = document.createElement('button');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    eliminarFila(fila);
  });
  celdaEliminar.appendChild(botonEliminar);
  fila.appendChild(celdaEliminar);

  tabla.appendChild(fila);
  actualizarFiltros();
}


// eliminar una fila de la tabla de desviaciones
function eliminarFila(fila) {
  const tabla = fila.closest('tbody');
  fila.remove();
  guardarDatosTabla();
  actualizarFiltros();
  alert('Datos eliminados correctamente.');
}

// crear un combo box (select) con opciones específicas
function crearComboBox(options) {
  let html = '<select class="form-control">';
  options.forEach(option => {
    html += `<option>${option}</option>`;
  });
  html += '</select>';
  return html;
}

// Crear un combo box de prioridades con clases de estilo
function crearComboBoxPrioridades() {
  let html = '<select class="form-control">';
  prioridades.forEach(p => {
    html += `<option class="${p.clase}">${p.valor}</option>`;
  });
  html += '</select>';
  return html;
}

// Obtener todas las acciones de todas las preguntas
function obtenerTodasLasAcciones() {
  return accionCorrectivas.flatMap(q => q.action);
}

// Obtener acciones para una pregunta seleccionada
function obtenerAccionesPorPregunta(preguntaSeleccionada) {
  const question = accionCorrectivas.find(q => q.question === preguntaSeleccionada);
  return question ? question.action : [];
}

// ComboBox con todas las acciones disponibles inicialmente
function crearComboBoxTodasLasAction(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control acciones';

  const todasLasAcciones = obtenerTodasLasAcciones();
  todasLasAcciones.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    if (action === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Actualizar ComboBox de acciones basado en la pregunta seleccionada
function actualizarComboBoxActions(preguntaSeleccionada, selectActions) {
  console.log("Actualizando ComboBox para pregunta:", preguntaSeleccionada);
  const actions = obtenerAccionesPorPregunta(preguntaSeleccionada);
  console.log("Acciones obtenidas:", actions);

  selectActions.innerHTML = '';

  actions.forEach(action => {
    const option = document.createElement('option');
    option.value = action;
    option.text = action;
    console.log("Agregando opción al select:", action);
    selectActions.appendChild(option);
  });
}

// Crear ComboBox de preguntas
function crearComboBoxTodasLasPreguntas(valorSeleccionado) {
  const preguntas = obtenerTodasLasPreguntas();
  const select = document.createElement('select');
  select.className = 'form-control preguntas';

  preguntas.forEach(pregunta => {
    const option = document.createElement('option');
    option.value = pregunta;
    option.text = pregunta;
    if (pregunta === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', (event) => {
    const preguntaSeleccionada = event.target.value;
    const fila = event.target.closest('tr');
    const selectActions = fila.querySelector('.form-control.acciones');
    actualizarComboBoxActions(preguntaSeleccionada, selectActions);
  });

  return select;
}

// combo box de criterios
function crearComboBoxCriterios(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  criterio.forEach(criterio => {
    const option = document.createElement('option');
    option.value = criterio;
    option.text = criterio;
    if (criterio === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
}

//combo box desviaciones
function crearComboBoxDesviaciones(valorSeleccionado) {
  const select = document.createElement('select');
  select.className = 'form-control';
  desviaciones.forEach(desviacion => {
    const option = document.createElement('option');
    option.value = desviacion;
    option.text = desviacion;
    if (desviacion === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
}

//combo box cantidad de dias
function crearComboBoxCantidadDeDias(valorSeleccionado) {
  const dias = [10, 15, 30, 45];
  const select = document.createElement('select');
  select.className = 'form-control';

  dias.forEach(dia => {
    const option = document.createElement('option');
    option.value = dia;
    option.text = `${dia} días`;
    if (dia === valorSeleccionado) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  return select;
}

// Función para enviar la imagen a la API
function crearCeldaConInputFoto() {
  const td = document.createElement('td');
  td.classList.add('td-foto')

  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';


  const uploadButton = document.createElement('button');
  uploadButton.innerText = 'Enviar';
  uploadButton.classList.add('btn-blue');
  uploadButton.style.display = 'none';

  inputFile.addEventListener('change', function () {
    if (inputFile.files.length > 0) {
      inputFile.style.display = 'none';
      uploadButton.style.display = 'inline-block';
    }
  });

  uploadButton.addEventListener('click', function () {
    const file = inputFile.files[0];
    if (file) {
      enviarImagen(file);
    } else {
      alert('Por favor, selecciona una imagen primero.');
    }
  });

  td.appendChild(inputFile);
  td.appendChild(uploadButton);

  return td;
}


function enviarImagen(file) {
  const formData = new FormData();
  formData.append('image', file);

  fetch('URL_DE_TU_API', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Imagen subida correctamente:', data);

    })
    .catch(error => {
      console.error('Error al subir la imagen:', error);
    });
}

// actualizar la prioridad y calcular fechas relacionadas
function actualizarPrioridad(event) {
  const fila = event.target.closest('tr');
  const prioridadSeleccionada = prioridades.find(p => p.valor === event.target.value);
  fila.className = prioridadSeleccionada.clase;
  const fechaRecepcion = new Date(fila.cells[8].innerText.split('/').reverse().join('-'));
  const fechaSolucion = new Date(fechaRecepcion);
  fechaSolucion.setDate(fechaRecepcion.getDate() + prioridadSeleccionada.dias);
  fila.cells[9].innerText = fechaSolucion.toLocaleDateString('es-ES');
  const diferenciaDias = Math.ceil((fechaSolucion - fechaRecepcion) / (1000 * 60 * 60 * 24));
  fila.cells[10].innerText = diferenciaDias;
  fila.cells[16].innerText = new Date().toLocaleDateString('es-ES');
}

// actualizar el estado y establecer la fecha de cambio de estado
function actualizarEstado(event) {
  const fila = event.target.closest('tr');
  fila.cells[7].innerText = new Date().toLocaleDateString('es-ES');
}

// actualizar los valores de los filtros de la tabla
function actualizarFiltros() {
  const table = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const rows = table.getElementsByTagName('tr');
  const filters = document.querySelectorAll('.filter-select');
  filters.forEach(filter => {
    const column = filter.getAttribute('data-column');
    filter.innerHTML = '<option value="">Todos</option>';
    const values = new Set();
    for (let i = 0; i < rows.length; i++) {
      const cellValue = rows[i].getElementsByTagName('td')[column].innerText;
      if (cellValue) {
        values.add(cellValue);
      }
    }
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.text = value;
      filter.add(option);
    });
  });
}


//Buttons

// guardar datos de la tabla en localStorage
function guardarDatosTabla() {
  const tabla = document.getElementById('tabla-desviaciones').getElementsByTagName('tbody')[0];
  const filas = tabla.getElementsByTagName('tr');
  const datos = Array.from(filas).map(fila => {
    const celdas = fila.getElementsByTagName('td');

    return {
      numeroPC: celdas[0]?.innerText || '',
      numeroPregunta: celdas[1]?.querySelector('select')?.value || '',
      criterio: celdas[2]?.querySelector('select')?.value || '',
      desviacion: celdas[3]?.querySelector('select')?.value || '',
      prioridad: celdas[4]?.querySelector('select')?.value || '',
      estado: celdas[5]?.querySelector('select')?.value || '',
      planAccion: celdas[6]?.querySelector('input')?.value || '',
      fechaCambioEstado: celdas[7]?.innerText || '',
      fechaRecepcionSolicitud: celdas[8]?.innerText || '',
      fechaSolucionProgramada: celdas[9]?.innerText || '',
      cantidadDias: celdas[10]?.innerText || '',
      entidad: celdas[11]?.querySelector('select')?.value || '',
      responsableDesviacion: celdas[12]?.querySelector('select')?.value || '',
      auditor: celdas[13]?.querySelector('select')?.value || '',
      contacto: celdas[14]?.querySelector('input')?.value || '',
      correo: celdas[15]?.querySelector('input')?.value || '',
      fechaUltimaModificacion: celdas[16]?.innerText || '',
      foto: celdas[17]?.querySelector('input')?.value || ''
    };
  });

  localStorage.setItem('tablaDatos', JSON.stringify(datos));
  alert('Lista de Desviaciones actualizada.');
}

// Descargar la tabla como archivo Excel
function descargarTablaExcel() {
  const tabla = document.getElementById('tabla-desviaciones');
  const ws = XLSX.utils.table_to_sheet(tabla);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'tabla.xlsx');
}





