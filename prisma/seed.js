const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ==========================================
  // PLANES
  // ==========================================
  const existingPlans = await prisma.plan.findMany();
  
  console.log(`📊 Planes existentes: ${existingPlans.length}`);
  existingPlans.forEach(p => console.log(`  - ${p.nombre} (ID: ${p.idPlan})`));

  const plans = [
    { nombre: '210' },
    { nombre: '310' },
    { nombre: '410' },
    { nombre: '510' },
    { nombre: 'Bronce' },
    { nombre: 'Plata' },
    { nombre: 'Oro' },
    { nombre: 'Platino' },
  ];

  console.log('📝 Creando planes faltantes...');
  
  for (const plan of plans) {
    const exists = existingPlans.some(p => p.nombre === plan.nombre);
    
    if (exists) {
      console.log(`⏭️  Plan "${plan.nombre}" ya existe, omitiendo...`);
      continue;
    }
    
    const created = await prisma.plan.create({
      data: plan
    });
    console.log(`✅ Plan creado: ${created.nombre} (ID: ${created.idPlan})`);
  }

  // ==========================================
  // SITUACIONES TERAPÉUTICAS
  // ==========================================
  console.log('\n📊 Verificando situaciones terapéuticas...');
  const existingSituaciones = await prisma.situacionTerapeutica.findMany();
  
  console.log(`Situaciones existentes: ${existingSituaciones.length}`);
  existingSituaciones.forEach(s => console.log(`  - ${s.nombre} (ID: ${s.idSituacion})`));

  const situaciones = [
    { idSituacion: 1, nombre: 'Embarazo' },
    { idSituacion: 2, nombre: 'Diabetes' },
    { idSituacion: 3, nombre: 'Miopía' },
    { idSituacion: 4, nombre: 'Hipertensión' },
    { idSituacion: 5, nombre: 'Rehabilitación motriz' },
    { idSituacion: 6, nombre: 'Kinesiología' },
    { idSituacion: 7, nombre: 'Psicoterapia' },
    { idSituacion: 8, nombre: 'Fonoaudiología' },
    { idSituacion: 9, nombre: 'Otra' },
  ];

  console.log('📝 Creando situaciones terapéuticas faltantes...');
  
  for (const situacion of situaciones) {
    const exists = existingSituaciones.some(s => s.idSituacion === situacion.idSituacion);
    
    if (exists) {
      console.log(`⏭️  Situación "${situacion.nombre}" ya existe, omitiendo...`);
      continue;
    }
    
    const created = await prisma.situacionTerapeutica.create({
      data: situacion
    });
    console.log(`✅ Situación creada: ${created.nombre} (ID: ${created.idSituacion})`);
  }

  // ==========================================
  // ESPECIALIDADES
  // ==========================================
  console.log('\n📊 Verificando especialidades...');
  const existingEspecialidades = await prisma.especialidad.findMany();
  
  console.log(`Especialidades existentes: ${existingEspecialidades.length}`);
  existingEspecialidades.forEach(e => console.log(`  - ${e.nombre} (ID: ${e.idEspecialidad})`));

  const especialidades = [
    { nombre: 'Clínica' },
    { nombre: 'Pediatría' },
    { nombre: 'Cardiología' },
    { nombre: 'Dermatología' },
    { nombre: 'Oftalmología' },
    { nombre: 'Otorrinolaringología' },
    { nombre: 'Ginecología' },
    { nombre: 'Resonancias' },
    { nombre: 'Traumatología' },
    { nombre: 'Neurología' },
  ];

  console.log('📝 Creando especialidades faltantes...');
  
  for (const especialidad of especialidades) {
    const exists = existingEspecialidades.some(e => e.nombre === especialidad.nombre);
    
    if (exists) {
      console.log(`⏭️  Especialidad "${especialidad.nombre}" ya existe, omitiendo...`);
      continue;
    }
    
    const created = await prisma.especialidad.create({
      data: especialidad
    });
    console.log(`✅ Especialidad creada: ${created.nombre} (ID: ${created.idEspecialidad})`);
  }

  console.log('\n🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
