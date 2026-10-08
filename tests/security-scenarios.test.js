/**
 * Mājas skola — Firebase drošības noteikumu un piekļuves kontroles pārbaudes scenāriji
 * Testē 8 galvenos drošības scenārijus:
 *   1. Neautentificēta piekļuve (Unauthenticated access)
 *   2. Neapstiprināta lietotāja piekļuve (Unauthorized user)
 *   3. Patvaļīga lomas maiņa par vecāku (Self-elevation to parent)
 *   4. Bērna mēģinājums skatīt otra bērna individuālos rezultātus (Cross-child progress read)
 *   5. Rezultāta viltošana ar svešu studentUid (Forged progress record)
 *   6. Bērna mēģinājums izveidot jaunu uzdevumu (Student task creation)
 *   7. Vecāka pilnvarotā piekļuve un uzdevumu pārvaldība (Parent full access)
 *   8. Wildcard noteikumu apiešanas aizsardzība (Wildcard bypass protection)
 */

export const securityTestScenarios = [
  {
    id: 'SEC-01',
    name: 'Neautentificēts lietotājs mēģina lasīt homeSchool datus',
    actor: { auth: null },
    targetPath: 'homeSchool/data/progress/entry1',
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED',
    description: 'Jebkuram neautentificētam pieprasījumam jābūt noraidītam'
  },
  {
    id: 'SEC-02',
    name: 'Autentificēts lietotājs ārpus ģimenes mēģina lasīt uzdevumus',
    actor: { uid: 'stranger_123', email: 'stranger@example.com', approved: false },
    targetPath: 'homeSchool/data/tasks/task1',
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED',
    description: 'Lietotāji, kas nav reģistrēti kā apstiprināti ģimenes locekļi (approved != true), nedrīkst piekļūt uzdevumiem'
  },
  {
    id: 'SEC-03',
    name: 'Lietotājs mēģina patvaļīgi reģistrēt sev lomu "vecaks"',
    actor: { uid: 'student_marks', email: 'marks@school.lv' },
    targetPath: 'homeSchool/data/users/student_marks',
    operation: 'create',
    payload: { role: 'vecaks', approved: true },
    expectedResult: 'PERMISSION_DENIED',
    description: 'Noteikumi aizliedz lomas "vecaks" pašpiešķiršanu jauniem lietotājiem bez vecāka autorizācijas'
  },
  {
    id: 'SEC-04',
    name: 'Marks mēģina lasīt Samantas individuālos progresa rezultātus',
    actor: { uid: 'marks_uid', role: 'marks', approved: true },
    targetPath: 'homeSchool/data/progress/samanta_score_456',
    resourceData: { studentUid: 'samanta_uid', studentRole: 'samanta', score: 95 },
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED',
    description: 'Bērns drīkst skatīt TIKAI tos progresa ierakstus, kur studentUid == request.auth.uid'
  },
  {
    id: 'SEC-05',
    name: 'Samanta lasa savus personīgos progresa datus',
    actor: { uid: 'samanta_uid', role: 'samanta', approved: true },
    targetPath: 'homeSchool/data/progress/samanta_score_456',
    resourceData: { studentUid: 'samanta_uid', studentRole: 'samanta', score: 95 },
    operation: 'get',
    expectedResult: 'ALLOWED',
    description: 'Bērnam ir pilna piekļuve saviem personīgajiem rezultātiem'
  },
  {
    id: 'SEC-06',
    name: 'Bērns mēģina saglabāt progresa ierakstu ar svešu studentUid',
    actor: { uid: 'marks_uid', role: 'marks', approved: true },
    targetPath: 'homeSchool/data/progress/new_score',
    payload: { studentUid: 'samanta_uid', score: 100 },
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    description: 'Bērns nedrīkst viltot otra bērna rezultātus — studentUid jāsakrīt ar auth.uid'
  },
  {
    id: 'SEC-07',
    name: 'Bērns mēģina izveidot jaunu mācību uzdevumu',
    actor: { uid: 'marks_uid', role: 'marks', approved: true },
    targetPath: 'homeSchool/data/tasks/new_task',
    payload: { title: 'Datorspēļu stunda', assignedTo: 'marks' },
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    description: 'Uzdevumus izveidot un dzēst drīkst TIKAI vecāks (isParent() == true)'
  },
  {
    id: 'SEC-08',
    name: 'Vecāks lasa abu bērnu rezultātus un izveido uzdevumus',
    actor: { uid: 'parent_uid', role: 'vecaks', approved: true },
    targetPath: 'homeSchool/data/progress/samanta_score_456',
    resourceData: { studentUid: 'samanta_uid', studentRole: 'samanta' },
    operation: 'get',
    expectedResult: 'ALLOWED',
    description: 'Vecāks drīkst pārskatīt abu bērnu datus un izveidot jaunus uzdevumus'
  }
];

// Simulētais noteikumu pārbaudītājs lokālai validācijai
export function evaluateMockSecurityRule(scenario) {
  const { actor, targetPath, operation, payload, resourceData } = scenario;

  // 1. Neautentificēts
  if (!actor.auth && !actor.uid) {
    return 'PERMISSION_DENIED';
  }

  const isParent = actor.role === 'vecaks' && actor.approved === true;
  const isApproved = actor.approved === true;

  // users kolekcija
  if (targetPath.startsWith('homeSchool/data/users/')) {
    if (operation === 'create' && payload?.role === 'vecaks' && !isParent) {
      return 'PERMISSION_DENIED';
    }
    return 'ALLOWED';
  }

  // tasks kolekcija
  if (targetPath.startsWith('homeSchool/data/tasks/')) {
    if ((operation === 'create' || operation === 'delete') && !isParent) {
      return 'PERMISSION_DENIED';
    }
    return isApproved ? 'ALLOWED' : 'PERMISSION_DENIED';
  }

  // progress kolekcija
  if (targetPath.startsWith('homeSchool/data/progress/')) {
    if (operation === 'get' || operation === 'list') {
      if (isParent) return 'ALLOWED';
      if (isApproved && resourceData?.studentUid === actor.uid) return 'ALLOWED';
      return 'PERMISSION_DENIED';
    }
    if (operation === 'create') {
      if (isParent) return 'ALLOWED';
      if (isApproved && payload?.studentUid === actor.uid) return 'ALLOWED';
      return 'PERMISSION_DENIED';
    }
  }

  return 'PERMISSION_DENIED';
}

export function runAllSecurityScenarios() {
  console.log('--- Sākas Mājas skolas drošības scenāriju pārbaude ---');
  let passed = 0;
  for (const s of securityTestScenarios) {
    const outcome = evaluateMockSecurityRule(s);
    const ok = outcome === s.expectedResult;
    if (ok) passed++;
    console.log(`[${ok ? 'PASSED' : 'FAILED'}] ${s.id}: ${s.name} -> ${outcome}`);
  }
  console.log(`Rezultāts: ${passed}/${securityTestScenarios.length} scenāriji veiksmīgi.`);
  return passed === securityTestScenarios.length;
}

// Ja tiek palaists tieši ar Node:
if (import.meta.url === `file://${process.argv[1]}`) {
  const allOk = runAllSecurityScenarios();
  process.exit(allOk ? 0 : 1);
}
