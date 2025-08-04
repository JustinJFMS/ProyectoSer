
const deberes = [
    "Mantener el buen orden y aseo en la institución",
    "Cumplir las normas y actuar de buena fe",
    "Exponer claramente su estado de salud y la causa de su visita",
    "Seguir las recomendaciones médicas",
    "No solicitar servicios con información engañosa",
    "Expresar la información que se solicita para prestar un buen servicio",
    "Informar de todo acto que afecte a la clínica",
    "Cumplir las citas y requerimientos del personal de salud",
    "Respetar al personal de salud y a los usuarios",
    "Brindar un trato amable y digno"
];

const derechos = [
    "Conocer todos los trámites administrativos",
    "Ser informado de todo lo relacionado con su atención",
    "Recibir atención que salvaguarda su dignidad personal y respete sus valores",
    "Respetar su privacidad, confidencialidad de la información y contar con una historia clínica íntegra, veraz y legible",
    "Recibir un trato amable, cortés y humano por parte de todo el personal",
    "Conocer toda la información sobre la enfermedad",
    "Recibir prescripción de medicamentos y explicación de vías de administración",
    "Aceptar o rechazar procedimientos dejando constancia escrita",
    "Recibir atención requerida de acuerdo a sus necesidades"
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userData = {};

function startQuiz() {
    const fullName = document.getElementById('fullName').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const room = document.getElementById('room').value.trim();

    if (!fullName || !cedula || !room) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    userData = { fullName, cedula, room };

    document.getElementById('user-info').innerHTML = `
                <strong>Participante:</strong> ${fullName} | 
                <strong>Cédula:</strong> ${cedula} | 
                <strong>Sala:</strong> ${room}
            `;

    questions = [];

    const shuffledDeberes = [...deberes].sort(() => Math.random() - 0.5).slice(0, 5);
    shuffledDeberes.forEach(deber => {
        questions.push({ text: deber, correct: 'deber' });
    });

    const shuffledDerechos = [...derechos].sort(() => Math.random() - 0.5).slice(0, 5);
    shuffledDerechos.forEach(derecho => {
        questions.push({ text: derecho, correct: 'derecho' });
    });

    questions = questions.sort(() => Math.random() - 0.5);

    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('progress-text').textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('next-btn').style.display = 'none';
    selectedAnswer = null;
}

function selectAnswer(answer) {
    selectedAnswer = answer;

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    event.target.classList.add('selected');
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    if (!selectedAnswer) return;

    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    const scoreElement = document.getElementById('final-score');
    scoreElement.textContent = percentage + '%';

    let message = '';
    let scoreClass = '';

    if (percentage >= 80) {
        message = `¡Excelente, ${userData.fullName}! Tienes un conocimiento sólido sobre derechos y deberes del paciente.`;
        scoreClass = '';
    } else if (percentage >= 60) {
        message = `Bien hecho, ${userData.fullName}. Tienes una buena base, pero puedes mejorar revisando algunos conceptos.`;
        scoreClass = 'medium';
    } else {
        message = `${userData.fullName}, te recomendamos revisar más sobre derechos y deberes del paciente para mejorar tus conocimientos.`;
        scoreClass = 'low';
    }

    scoreElement.className = 'score ' + scoreClass;
    document.getElementById('score-message').textContent = message;

    showCompleteList();
}

function showCompleteList() {
    const rightsList = document.getElementById('rights-list');
    rightsList.innerHTML = '';
    derechos.forEach((derecho, index) => {
        const li = document.createElement('li');
        li.style.cssText = `
            padding: 8px 12px;
            margin-bottom: 8px;
            background: #f8f9fa;
            border-left: 3px solid #27ae60;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.4;
        `;
        li.innerHTML = `<strong>${index + 1}.</strong> ${derecho}`;
        rightsList.appendChild(li);
    });

    const dutiesList = document.getElementById('duties-list');
    dutiesList.innerHTML = '';
    deberes.forEach((deber, index) => {
        const li = document.createElement('li');
        li.style.cssText = `
            padding: 8px 12px;
            margin-bottom: 8px;
            background: #f8f9fa;
            border-left: 3px solid #e74c3c;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.4;
        `;
        li.innerHTML = `<strong>${index + 1}.</strong> ${deber}`;
        dutiesList.appendChild(li);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    document.getElementById('results').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';

    document.getElementById('fullName').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('room').value = '';
}