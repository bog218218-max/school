const body = document.body;
const siteShells = document.querySelectorAll('[data-shell="site"]');
const resultView = document.querySelector('#result-view');
const demoView = document.querySelector('#demo-view');
const leadDialog = document.querySelector('#lead-dialog');
const toast = document.querySelector('.toast');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const diagnosticForm = document.querySelector('#diagnostic-form');
const STORAGE_KEY = 'marshrut-ege-student-state-v1';
let studentState = null;

const tariffCatalog = {
  Start: {
    title: 'Start',
    price: '3 900 ₽/мес',
    summary: 'Для ученика, который умеет заниматься сам, но хочет порядок, трекер и понятный план.'
  },
  Plus: {
    title: 'Plus',
    price: '6 900 ₽/мес',
    summary: 'Для ученика, которому нужен контроль, наставник, регулярный разбор ошибок и сводка для родителей.'
  },
  Max: {
    title: 'Max',
    price: '12 900 ₽/мес',
    summary: 'Для высокой цели, второй части и индивидуальной проверки развёрнутых ответов.'
  },
  'Практика по маршруту': {
    title: 'Практика по маршруту',
    price: 'формат Plus',
    summary: 'Доступ к практике, проверке и комментариям наставника.'
  },
  'Разбор пробника': {
    title: 'Разбор пробника',
    price: 'формат Plus',
    summary: 'Проверка пробника, карта ошибок и обновление маршрута.'
  },
  'Вопрос наставнику': {
    title: 'Вопрос наставнику',
    price: 'формат Plus',
    summary: 'Короткая консультация по текущему маршруту и слабым темам.'
  },
  'План с наставником': {
    title: 'План с наставником',
    price: 'формат Plus',
    summary: 'Совместная настройка темпа, задач недели и контрольных точек.'
  },
  'Родительский отчёт': {
    title: 'Родительский отчёт',
    price: 'формат Plus',
    summary: 'Сводка по регулярности, темам, динамике баллов и рекомендациям.'
  },
  'Консультация для родителей': {
    title: 'Консультация для родителей',
    price: 'бесплатный вводный звонок',
    summary: 'Покажем, как родитель видит маршрут, прогресс и комментарии наставника.'
  },
  'Подбор тарифа': {
    title: 'Подбор тарифа',
    price: 'подбор тарифа',
    summary: 'Подберём формат после диагностики, цели и главной сложности ученика.'
  }
};

const routeProfiles = {
  'Не понимаю, что учить': {
    risk: 'Нет порядка тем',
    pace: '4 шага в неделю',
    summary: 'Главный риск: ученик не понимает, что учить дальше. Начинаем с карты приоритетов и убираем случайный выбор материалов.',
    next: 'Сначала показываем темы с самым сильным влиянием на балл, затем открываем первый фокус недели.',
    mentor: 'Ты не должен сам выбирать из десятков материалов. Сначала соберём карту пробелов и оставим только ближайшие темы.',
    topics: ['Базовые темы', 'Алгебра', 'План повторения'],
    plan: ['Диагностика по базовым темам', 'Карта приоритетов', '2 тренировки по первому блоку', 'Мини-проверка', 'Отчёт родителю']
  },
  'Не хватает практики': {
    risk: 'Не хватает регулярной практики',
    pace: '5 шагов в неделю',
    summary: 'Главный риск: мало регулярной практики. На первой неделе не добавляем много теории, сначала даём короткие тренировки по слабым темам.',
    next: 'Начать с тренировки по самой слабой теме, затем пройти мини-пробник и посмотреть, где ошибки повторяются.',
    mentor: 'Сначала практика, потом новая теория. Ошибки недели покажут, что закреплять дальше.',
    topics: ['Производная', 'Параметры', 'Текстовые задачи'],
    plan: ['Диагностика по базовым темам', 'Разбор ошибок', '3 тренировки по слабым заданиям', 'Мини-пробник в конце недели', 'Обновление маршрута']
  },
  'Сложно держать темп': {
    risk: 'Нужен реалистичный темп',
    pace: '4 шага без перегруза',
    summary: 'Главный риск: темп срывается. Маршрут оставляет главное на неделю и не превращает подготовку в аврал.',
    next: 'Собрать план на 7 дней с короткими тренировками, одной контрольной точкой и запасом на восстановление.',
    mentor: 'Сейчас важнее стабильность, чем попытка закрыть всё сразу. Уберём лишнее и вернём рабочий ритм.',
    topics: ['План недели', 'Повторение', 'Контрольная точка'],
    plan: ['Короткая диагностика', 'План тем на неделю', 'Тренировка без перегруза', 'Контрольная точка', 'Комментарий наставника']
  },
  'Не вижу прогресс': {
    risk: 'Прогресс не виден по темам',
    pace: '5 измеримых шагов',
    summary: 'Главный риск: прогресс не виден. На первой неделе добавляем короткий входной пробник и фиксируем стартовый балл.',
    next: 'Зафиксировать стартовый результат, включить трекер тем и смотреть, какие ошибки повторяются после каждой тренировки.',
    mentor: 'Сделаем движение заметным: стартовый балл, закрытые темы и повторяющиеся ошибки будут в одном кабинете.',
    topics: ['Стартовый балл', 'Закрытые темы', 'Ошибки пробника'],
    plan: ['Стартовый пробник', 'Отметка закрытых тем', 'План по слабым местам', 'Промежуточная проверка', 'Отчёт по изменениям']
  },
  'Нужна помощь со второй частью': {
    risk: 'Нужна проверка сложных решений',
    pace: '3 глубоких разбора',
    summary: 'Главный риск: вторая часть. Добавляем проверку развёрнутых решений и комментарий по логике оформления.',
    next: 'Разобрать одно задание второй части, отметить потерянные баллы и отправить новое решение на проверку.',
    mentor: 'Во второй части важен не только ответ. Проверим ход решения, аргументацию и оформление по критериям.',
    topics: ['Вторая часть', 'Аргументация', 'Оформление'],
    plan: ['Диагностика сложных заданий', 'Разбор одного решения', 'Практика с проверкой', 'Мини-пробник', 'Рекомендация наставника']
  }
};

const subjectLabels = {
  математике: 'математике',
  'русскому языку': 'русскому языку',
  обществознанию: 'обществознанию',
  истории: 'истории',
  'английскому языку': 'английскому языку',
  информатике: 'информатике'
};

const subjectNames = {
  математике: 'математика',
  'русскому языку': 'русский язык',
  обществознанию: 'обществознание',
  истории: 'история',
  'английскому языку': 'английский язык',
  информатике: 'информатика'
};

const subjectProfiles = {
  математика: {
    topics: ['Производная', 'Параметры', 'Текстовые задачи'],
    next: 'Пройти мини-проверку по производной, параметрам и текстовым задачам, чтобы уточнить карту пробелов.',
    mentor: 'В математике быстрее всего растёт результат, когда ошибки сразу уходят в короткую тренировку и проверку решения.',
    plan: ['Диагностика по базовым заданиям', 'Разбор ошибок в производной', 'Тренировка по параметрам', 'Текстовые задачи на скорость', 'Мини-пробник и обновление плана']
  },
  'русский язык': {
    topics: ['Аргументация', 'Сочинение', 'Пунктуация'],
    next: 'Написать короткий фрагмент сочинения и пройти пунктуационную проверку на 20 минут.',
    mentor: 'В русском языке держим фокус на тексте: аргументация, структура сочинения и повторяющиеся пунктуационные ошибки.',
    plan: ['Диагностика по тестовой части', 'Карта ошибок пунктуации', 'Фрагмент сочинения', 'Разбор аргументации', 'Мини-пробник и правка плана']
  },
  обществознание: {
    topics: ['Право', 'Экономика', 'Задания второй части'],
    next: 'Пройти короткую проверку по праву и экономике, затем разобрать одно задание второй части.',
    mentor: 'В обществознании важно видеть связь понятий с форматом ответа. Начинаем с права, экономики и второй части.',
    plan: ['Диагностика понятий', 'Тренировка по праву', 'Экономика в заданиях', 'Разбор второй части', 'Мини-пробник и обновление маршрута']
  },
  история: {
    topics: ['Хронология', 'Историческое сочинение', 'Причины и следствия'],
    next: 'Собрать хронологическую ленту и разобрать один причинно-следственный блок.',
    mentor: 'В истории маршрут начинается с хронологии и связей между событиями, чтобы факты складывались в систему.',
    plan: ['Стартовая хронология', 'Карта периодов', 'Причины и следствия', 'Разбор письменного ответа', 'Мини-пробник по периоду']
  },
  'английский язык': {
    topics: ['Грамматика', 'Письмо', 'Аудирование'],
    next: 'Пройти грамматическую проверку и написать короткий ответ с разбором ошибок.',
    mentor: 'В английском держим баланс: точность грамматики, письмо по критериям и регулярная языковая практика.',
    plan: ['Грамматическая диагностика', 'Письменный ответ', 'Аудирование', 'Тренировка лексики', 'Мини-пробник и рекомендации']
  },
  информатика: {
    topics: ['Алгоритмы', 'Системы счисления', 'Программирование'],
    next: 'Пройти короткую проверку по алгоритмам и системам счисления, затем решить одну задачу с кодом.',
    mentor: 'В информатике маршрут должен быстро показать, где теряются баллы: логика, код или длинные задачи.',
    plan: ['Диагностика алгоритмов', 'Системы счисления', 'Задача с кодом', 'Разбор ошибок', 'Мини-пробник и новый фокус']
  }
};

function buildRouteProfile(subjectName, problem, time) {
  const riskProfile = routeProfiles[problem] || routeProfiles['Не хватает практики'];
  const subjectProfile = subjectProfiles[subjectName] || subjectProfiles.математика;
  const riskRecommendations = {
    'Не понимаю, что учить': {
      summary: 'Ты не должен сам решать, что учить дальше. Маршрут начнётся с карты приоритетов: что уже держится, где пробелы и что сильнее всего влияет на балл.',
      next: 'Сначала расставить темы по влиянию на балл, затем открыть первый фокус недели.',
      mentor: 'Не добавляем новые материалы, пока не видны приоритеты. Сначала собираем карту пробелов.'
    },
    'Не хватает практики': {
      summary: 'На первой неделе не добавляем много теории. Сначала даём короткие тренировки по слабым темам и смотрим, где ошибки повторяются.',
      next: 'Начать с тренировки по самой слабой теме, затем пройти мини-пробник.',
      mentor: 'Ставим регулярную практику и фиксируем ошибки. Через неделю маршрут обновится по результатам мини-пробника.'
    },
    'Сложно держать темп': {
      summary: 'План недели удерживает спокойный темп: меньше случайных задач, больше коротких контрольных точек и понятный объём без перегруза.',
      next: 'Собрать реалистичный план на 7 дней без перегруза и лишних тем.',
      mentor: 'Разделяем подготовку на короткие блоки. Сейчас важнее стабильность, чем попытка закрыть всё сразу.'
    },
    'Не вижу прогресс': {
      summary: 'Добавляем короткий входной пробник и фиксируем стартовый балл. После каждой тренировки кабинет покажет закрытые темы и повторяющиеся ошибки.',
      next: 'Зафиксировать стартовый пробник, включить трекер тем и смотреть динамику по неделям.',
      mentor: 'Добавляем пробники и трекер, чтобы каждое занятие было связано с изменением результата.'
    },
    'Нужна помощь со второй частью': {
      summary: 'Добавляем проверку развёрнутых решений: не только правильный ответ, но и логика, аргументация, оформление по критериям.',
      next: 'Разобрать одно задание второй части и отметить повторяющиеся ошибки в оформлении.',
      mentor: 'Работаем не объёмом, а качеством решения. Вторая часть требует проверки логики и оформления.'
    }
  };
  const recommendation = riskRecommendations[problem] || riskRecommendations['Не хватает практики'];
  const paceByTime = {
    'до 3 часов': '3 коротких шага в неделю',
    '3-5 часов': riskProfile.pace,
    '6-8 часов': '6 шагов в неделю',
    'больше 8 часов': '7 шагов с контрольными точками'
  };

  return {
    risk: riskProfile.risk,
    pace: paceByTime[time] || riskProfile.pace,
    summary: `${recommendation.summary} Предметный фокус: ${subjectProfile.topics.join(', ')}.`,
    next: `${subjectProfile.next} ${recommendation.next}`,
    mentor: `${subjectProfile.mentor} ${recommendation.mentor}`,
    topics: subjectProfile.topics,
    plan: [
      subjectProfile.plan[0],
      subjectProfile.plan[1],
      problem === 'Не вижу прогресс' ? 'Стартовый пробник и трекер динамики' : subjectProfile.plan[2],
      problem === 'Не хватает практики' ? 'Тренировка по слабым темам' : subjectProfile.plan[3],
      subjectProfile.plan[4]
    ]
  };
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/(^-|-$)/g, '');
}

function getProfileKey(state) {
  return [state.grade, state.exam, state.subject, state.goal, state.level, state.time, state.problem].join('|');
}

function formatRouteDate(value) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

function buildDefaultState(diagnosticState = getDiagnosticState()) {
  const baseScore = diagnosticState.level === 'начальный' ? 54 : diagnosticState.level === 'уверенный' ? 71 : 62;
  const topics = diagnosticState.profile.topics.map((title, index) => ({
    id: slugify(title) || `topic-${index + 1}`,
    title,
    priority: index === 0 ? 'высокий приоритет' : index === 1 ? 'следующий фокус' : 'поддерживающая практика',
    progress: Math.max(18, 38 - index * 9),
    errors: Math.max(1, 4 - index),
    status: index === 0 ? 'нужна тренировка' : index === 1 ? 'ждёт разбора' : 'в очереди'
  }));

  return {
    profile: {
      grade: diagnosticState.grade,
      exam: diagnosticState.exam,
      subject: diagnosticState.subject,
      subjectLabel: diagnosticState.subjectLabel,
      subjectName: diagnosticState.subjectName,
      goal: diagnosticState.goal,
      level: diagnosticState.level,
      time: diagnosticState.time,
      problem: diagnosticState.problem,
      key: getProfileKey(diagnosticState)
    },
    tasks: diagnosticState.profile.plan.slice(0, 3).map((title, index) => ({
      id: `task-${index + 1}`,
      title,
      completed: index === 0
    })),
    topics,
    practiceSession: {
      activeTopicId: topics[0]?.id || 'topic-1',
      status: 'idle',
      questions: [],
      solved: 34,
      total: 50,
      lastScore: null
    },
    mockTests: [
      { id: 'mock-1', title: 'Стартовый', score: baseScore - 6 },
      { id: 'mock-2', title: 'После диагностики', score: baseScore },
      { id: 'mock-3', title: 'Текущий', score: baseScore + 5 }
    ],
    mentorMessages: [
      {
        id: 'mentor-start',
        role: 'mentor',
        title: 'Мария',
        text: diagnosticState.profile.mentor
      }
    ],
    reviewStatus: 'Следующий комментарий появится после тренировки.',
    routeUpdatedAt: new Date().toISOString(),
    summaryComment: 'Подготовка идёт в рабочем темпе. Сейчас важнее закрепить ошибки, чем увеличивать нагрузку.'
  };
}

function loadStudentState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return buildDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed?.profile?.key || !Array.isArray(parsed.tasks)) return buildDefaultState();
    if (parsed.profile.key !== getProfileKey(getDiagnosticState())) return buildDefaultState();
    return parsed;
  } catch {
    return buildDefaultState();
  }
}

function saveStudentState() {
  if (!studentState) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(studentState));
  } catch {
    // Демо остаётся рабочим без сохранения, если браузер запретил localStorage.
  }
}

function syncStudentState(diagnosticState = getDiagnosticState()) {
  const nextKey = getProfileKey(diagnosticState);
  if (!studentState || studentState.profile.key !== nextKey) {
    studentState = buildDefaultState(diagnosticState);
    saveStudentState();
  }
  return studentState;
}

function getActiveTopic() {
  return studentState?.topics.find((topic) => topic.id === studentState.practiceSession.activeTopicId) || studentState?.topics[0];
}

function getTaskCompletion() {
  const total = studentState?.tasks.length || 0;
  const completed = studentState?.tasks.filter((task) => task.completed).length || 0;
  return { completed, total };
}

function getRouteProgress() {
  const { completed, total } = getTaskCompletion();
  const taskPart = total ? (completed / total) * 34 : 0;
  const topicPart = studentState.topics.reduce((sum, topic) => sum + topic.progress, 0) / Math.max(studentState.topics.length, 1) * 0.42;
  const mockPart = Math.min(18, Math.max(0, studentState.mockTests.at(-1).score - studentState.mockTests[0].score) * 1.6);
  return Math.min(96, Math.round(18 + taskPart + topicPart + mockPart));
}

const practiceBank = {
  математика: {
    default: [
      {
        id: 'math-base-1',
        type: 'Задание 1',
        text: 'Найдите значение выражения: 3,6 : 0,9 + 2,4.',
        options: ['4,4', '6,4', '8,4', '10,4'],
        correct: 1,
        feedback: '3,6 : 0,9 = 4. Затем 4 + 2,4 = 6,4.'
      },
      {
        id: 'math-base-2',
        type: 'Задание 4',
        text: 'Вероятность того, что ученик решит задачу, равна 0,7. Какова вероятность ошибки?',
        options: ['0,2', '0,3', '0,7', '1,7'],
        correct: 1,
        feedback: 'Вероятность противоположного события: 1 - 0,7 = 0,3.'
      },
      {
        id: 'math-base-3',
        type: 'Задание 9',
        text: 'Решите уравнение: 2x - 7 = 11.',
        options: ['x = 2', 'x = 7', 'x = 9', 'x = 18'],
        correct: 2,
        feedback: 'Переносим -7 вправо: 2x = 18, значит x = 9.'
      }
    ],
    derivative: [
      {
        id: 'math-derivative-1',
        type: 'Задание 7',
        text: 'Для функции f(x) = x^2 - 6x + 8 найдите f’(4).',
        options: ['-2', '0', '2', '8'],
        correct: 2,
        feedback: 'f’(x) = 2x - 6. Подставляем x = 4: 8 - 6 = 2.'
      },
      {
        id: 'math-derivative-2',
        type: 'Задание 7',
        text: 'Точка движется по закону s(t) = t^2 + 3t. Найдите скорость при t = 5.',
        options: ['8', '10', '13', '28'],
        correct: 2,
        feedback: 'Скорость равна производной: v(t) = 2t + 3. При t = 5 получаем 13.'
      },
      {
        id: 'math-derivative-3',
        type: 'Задание 12',
        text: 'Найдите точку минимума функции y = x^2 - 10x + 21.',
        options: ['x = -5', 'x = 5', 'x = 10', 'x = 21'],
        correct: 1,
        feedback: 'Вершина параболы: x = -b / 2a = 10 / 2 = 5.'
      }
    ],
    params: [
      {
        id: 'math-params-1',
        type: 'Задание 18, разогрев',
        text: 'При каком a уравнение x + a = 9 имеет корень x = 4?',
        options: ['a = 4', 'a = 5', 'a = 9', 'a = 13'],
        correct: 1,
        feedback: 'Подставляем x = 4: 4 + a = 9, значит a = 5.'
      },
      {
        id: 'math-params-2',
        type: 'Задание 18, разогрев',
        text: 'При каком a прямая y = ax проходит через точку (3; 12)?',
        options: ['a = 3', 'a = 4', 'a = 9', 'a = 12'],
        correct: 1,
        feedback: 'Подставляем координаты: 12 = 3a, значит a = 4.'
      },
      {
        id: 'math-params-3',
        type: 'Задание 18, разогрев',
        text: 'Уравнение x^2 = a имеет два различных корня. Какое условие на a верно?',
        options: ['a < 0', 'a = 0', 'a > 0', 'любое a'],
        correct: 2,
        feedback: 'У x^2 = a два различных корня только при положительном a.'
      }
    ],
    word: [
      {
        id: 'math-word-1',
        type: 'Задание 10',
        text: 'Поезд прошёл 180 км за 3 часа. Найдите среднюю скорость.',
        options: ['45 км/ч', '60 км/ч', '90 км/ч', '177 км/ч'],
        correct: 1,
        feedback: 'Скорость равна расстоянию, делённому на время: 180 : 3 = 60 км/ч.'
      },
      {
        id: 'math-word-2',
        type: 'Задание 10',
        text: 'Смесь массой 20 кг содержит 15% соли. Сколько килограммов соли в смеси?',
        options: ['1,5 кг', '3 кг', '5 кг', '15 кг'],
        correct: 1,
        feedback: '15% от 20 кг: 0,15 × 20 = 3 кг.'
      },
      {
        id: 'math-word-3',
        type: 'Задание 10',
        text: 'Цена выросла с 800 до 920 рублей. На сколько процентов выросла цена?',
        options: ['12%', '15%', '20%', '120%'],
        correct: 1,
        feedback: 'Рост 120 рублей. 120 / 800 = 0,15, то есть 15%.'
      }
    ]
  },
  'русский язык': {
    default: [
      {
        id: 'rus-1',
        type: 'Задание 9',
        text: 'В каком слове пропущена безударная проверяемая гласная корня: прим..рять, заг..релый, к..снуться?',
        options: ['примерять', 'загорелый', 'коснуться', 'во всех'],
        correct: 0,
        feedback: 'Примерять проверяется словом “мерить”. В остальных случаях работают чередования.'
      },
      {
        id: 'rus-2',
        type: 'Задание 12',
        text: 'Выберите верное написание: он бор..тся за результат.',
        options: ['борится', 'борется', 'боретсяь', 'борються'],
        correct: 1,
        feedback: 'Глагол “бороться” относится к I спряжению: он борется.'
      },
      {
        id: 'rus-3',
        type: 'Задание 15',
        text: 'Где нужна одна Н: кожа..ый, стекля..ый, дли..ый?',
        options: ['кожаный', 'стекляный', 'длиный', 'везде НН'],
        correct: 0,
        feedback: '“Кожаный” пишется с одной Н. “Стеклянный” и “длинный” пишутся с НН.'
      }
    ]
  },
  обществознание: {
    default: [
      {
        id: 'soc-1',
        type: 'Задание 2',
        text: 'Что относится к признакам государства?',
        options: ['Наличие суверенитета', 'Общие вкусы граждан', 'Единый стиль одежды', 'Одинаковый доход'],
        correct: 0,
        feedback: 'Суверенитет, территория, публичная власть и право взимать налоги относятся к признакам государства.'
      },
      {
        id: 'soc-2',
        type: 'Задание 6',
        text: 'Какой пример относится к рыночной экономике?',
        options: ['Цена складывается из спроса и предложения', 'Все цены назначает государство', 'Профессии закреплены законом', 'Конкуренция запрещена'],
        correct: 0,
        feedback: 'Рыночный механизм опирается на спрос, предложение, конкуренцию и свободу выбора.'
      },
      {
        id: 'soc-3',
        type: 'Задание 11',
        text: 'Что является примером социальной мобильности?',
        options: ['Переход студента на должность менеджера', 'Любимое хобби', 'Темперамент человека', 'Время года'],
        correct: 0,
        feedback: 'Социальная мобильность, это изменение позиции человека или группы в социальной структуре.'
      }
    ]
  },
  история: {
    default: [
      {
        id: 'hist-1',
        type: 'Хронология',
        text: 'Какое событие произошло раньше?',
        options: ['Крещение Руси', 'Куликовская битва', 'Смутное время', 'Северная война'],
        correct: 0,
        feedback: 'Крещение Руси, 988 год. Остальные события произошли позже.'
      },
      {
        id: 'hist-2',
        type: 'Персоналии',
        text: 'С каким правителем связаны реформы Избранной рады?',
        options: ['Иван IV', 'Пётр I', 'Александр II', 'Николай II'],
        correct: 0,
        feedback: 'Избранная рада связана с ранним периодом правления Ивана IV.'
      },
      {
        id: 'hist-3',
        type: 'Причина и следствие',
        text: 'Что стало одним из итогов Северной войны?',
        options: ['Выход России к Балтийскому морю', 'Отмена крепостного права', 'Присоединение Казани', 'Начало Смуты'],
        correct: 0,
        feedback: 'После Северной войны Россия закрепила выход к Балтийскому морю.'
      }
    ]
  },
  'английский язык': {
    default: [
      {
        id: 'eng-1',
        type: 'Grammar',
        text: 'Choose the correct form: She ___ to school every day.',
        options: ['go', 'goes', 'is go', 'going'],
        correct: 1,
        feedback: 'Present Simple, third person singular: she goes.'
      },
      {
        id: 'eng-2',
        type: 'Vocabulary',
        text: 'Choose the closest meaning of “reliable”.',
        options: ['dependable', 'expensive', 'temporary', 'confusing'],
        correct: 0,
        feedback: 'Reliable means dependable, someone or something you can trust.'
      },
      {
        id: 'eng-3',
        type: 'Grammar',
        text: 'Choose the correct option: I have lived here ___ 2020.',
        options: ['for', 'since', 'during', 'at'],
        correct: 1,
        feedback: 'Since is used with a starting point in time: since 2020.'
      }
    ]
  },
  информатика: {
    default: [
      {
        id: 'inf-1',
        type: 'Логика',
        text: 'Чему равно значение выражения: НЕ(1 И 0)?',
        options: ['0', '1', '10', 'невозможно определить'],
        correct: 1,
        feedback: '1 И 0 = 0. НЕ 0 = 1.'
      },
      {
        id: 'inf-2',
        type: 'Системы счисления',
        text: 'Переведите двоичное число 1011 в десятичную систему.',
        options: ['9', '10', '11', '12'],
        correct: 2,
        feedback: '1011₂ = 8 + 0 + 2 + 1 = 11.'
      },
      {
        id: 'inf-3',
        type: 'Алгоритмы',
        text: 'Сколько раз выполнится цикл: for i in range(3)?',
        options: ['2', '3', '4', 'бесконечно'],
        correct: 1,
        feedback: 'range(3) даёт значения 0, 1, 2, всего три итерации.'
      }
    ]
  }
};

function getPracticeTopicKey(subjectName, topicTitle) {
  const topic = topicTitle.toLowerCase();
  if (subjectName === 'математика' && /производ|касатель|экстрем|миним|максим/.test(topic)) return 'derivative';
  if (subjectName === 'математика' && /параметр/.test(topic)) return 'params';
  if (subjectName === 'математика' && /текст|задач|процент|скорост|смес/.test(topic)) return 'word';
  return 'default';
}

function getPracticeQuestions(topicTitle) {
  const subjectName = studentState?.profile?.subjectName || getDiagnosticState().subjectName;
  const subjectBank = practiceBank[subjectName] || practiceBank.математика;
  const topicKey = getPracticeTopicKey(subjectName, topicTitle);
  return subjectBank[topicKey] || subjectBank.default || practiceBank.математика.default;
}

function renderDashboard() {
  if (!studentState) syncStudentState();

  const activeTopic = getActiveTopic();
  const { completed, total } = getTaskCompletion();
  const routeProgress = getRouteProgress();
  const lastScore = studentState.mockTests.at(-1).score;
  const firstScore = studentState.mockTests[0].score;

  document.querySelector('#demo-greeting').textContent = `Кабинет: ${studentState.profile.grade}, ${studentState.profile.exam}`;
  document.querySelector('#demo-goal').textContent = `Цель: ${studentState.profile.exam} по ${studentState.profile.subjectLabel} на ${studentState.profile.goal}`;
  document.querySelector('#demo-next-title').textContent = activeTopic ? `${activeTopic.title}: 15 заданий` : 'Практика по слабой теме';
  document.querySelector('#demo-next-copy').textContent = activeTopic
    ? `Почему именно это: тема дала ${activeTopic.errors} ошибки и сильнее всего мешает цели ${studentState.profile.goal}.`
    : 'Пройдите диагностику, чтобы увидеть свой стартовый маршрут.';
  document.querySelector('#demo-next-hint').textContent = completed === total
    ? 'Задачи дня закрыты. После мини-пробника маршрут обновит фокус недели.'
    : 'Закройте задачи дня, чтобы маршрут показал следующий шаг без перегруза.';
  document.querySelector('#demo-task-status').textContent = `${completed} из ${total} готово`;
  document.querySelector('#demo-progress-ring').style.setProperty('--progress', routeProgress);
  document.querySelector('#demo-progress-ring span').textContent = `${routeProgress}%`;
  document.querySelector('#demo-progress-copy').textContent = `Закрыто ${completed} из ${total} задач дня. Последний пробник: ${lastScore} баллов, старт был ${firstScore}.`;
  document.querySelector('#demo-review-status').textContent = studentState.reviewStatus;
  document.querySelector('#demo-practice-copy').textContent = `${studentState.profile.problem}. Активная тема: ${activeTopic?.title || 'слабая тема'}. Ошибки превращаются в задания, а не остаются заметкой после пробника.`;
  document.querySelector('#demo-parent-focus').textContent = studentState.topics.slice(0, 2).map((topic) => topic.title).join(' и ');
  document.querySelector('#route-updated span').textContent = 'Маршрут обновлён';
  document.querySelector('#route-updated strong').textContent = formatRouteDate(studentState.routeUpdatedAt);

  renderTaskState();
  renderTopicState();
  renderPracticeState();
  renderMockState();
  renderMentorState();
  renderSummaryState();
}

function renderTaskState() {
  const taskStack = document.querySelector('#demo-task-stack');
  taskStack.innerHTML = '';
  studentState.tasks.forEach((task) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = task.completed;
    input.dataset.taskId = task.id;
    const text = document.createElement('span');
    text.textContent = task.title;
    label.append(input, text);
    taskStack.append(label);
  });
}

function renderTopicState() {
  const list = document.querySelector('#demo-topics');
  list.innerHTML = '';
  studentState.topics.forEach((topic) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = topic.id === studentState.practiceSession.activeTopicId ? 'topic-row is-active' : 'topic-row';
    row.dataset.topicId = topic.id;
    const main = document.createElement('strong');
    const meta = document.createElement('span');
    main.textContent = topic.title;
    meta.textContent = `${topic.priority}, ${topic.errors} ошибки, ${topic.progress}% закрыто`;
    row.append(main, meta);
    list.append(row);
  });
}

function renderPracticeState() {
  const panel = document.querySelector('#practice-trainer');
  const title = document.querySelector('#practice-week-title');
  const bar = document.querySelector('#practice-week-bar');
  const status = document.querySelector('#practice-week-status');
  const session = studentState.practiceSession;
  const activeTopic = getActiveTopic();
  const solvedPercent = Math.round((session.solved / session.total) * 100);

  title.textContent = `${session.solved} из ${session.total} заданий`;
  bar.style.setProperty('--value', `${solvedPercent}%`);
  status.textContent = session.lastScore === null
    ? 'Тренировка ещё не пройдена. Начните с активной темы.'
    : `Последняя тренировка: ${session.lastScore} из ${session.questions.length}.`;

  panel.innerHTML = '';
  if (session.status === 'idle' || !session.questions.length) {
    const empty = document.createElement('div');
    empty.className = 'trainer-empty';
    const heading = document.createElement('strong');
    const copy = document.createElement('p');
    heading.textContent = `Мини-тренировка по теме «${activeTopic?.title || 'фокус недели'}»`;
    copy.textContent = 'Три коротких задания из слабой темы. После ответов кабинет покажет ошибки и обновит маршрут.';
    const button = document.createElement('button');
    button.className = 'button button-primary';
    button.type = 'button';
    button.dataset.startPractice = '';
    button.textContent = 'Начать тренировку';
    empty.append(heading, copy, button);
    panel.append(empty);
    return;
  }

  session.questions.forEach((question, index) => {
    const block = document.createElement('div');
    block.className = 'trainer-question';
    const type = document.createElement('span');
    type.className = 'trainer-type';
    const heading = document.createElement('strong');
    type.textContent = question.type || `Задание ${index + 1}`;
    heading.textContent = question.text;
    const options = document.createElement('div');
    options.className = 'trainer-options';
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.questionId = question.id;
      button.dataset.answerIndex = String(optionIndex);
      button.textContent = option;
      if (question.answer !== null) {
        button.disabled = true;
        if (optionIndex === question.correct) button.classList.add('is-correct');
        if (optionIndex === question.answer && optionIndex !== question.correct) button.classList.add('is-wrong');
      }
      options.append(button);
    });
    block.append(type, heading, options);
    if (question.answer !== null) {
      const feedback = document.createElement('p');
      feedback.className = 'trainer-feedback';
      feedback.textContent = question.feedback;
      block.append(feedback);
    }
    panel.append(block);
  });

  if (session.status === 'completed') {
    const result = document.createElement('div');
    result.className = 'trainer-result';
    const heading = document.createElement('strong');
    const copy = document.createElement('p');
    heading.textContent = `Тренировка завершена: ${session.lastScore} из ${session.questions.length}`;
    copy.textContent = 'Маршрут обновил прогресс темы и статус проверки наставника.';
    result.append(heading, copy);
    panel.append(result);
  }
}

function renderMockState() {
  const scores = studentState.mockTests.map((test) => test.score);
  const firstScore = scores[0];
  const lastScore = scores.at(-1);
  const points = scores.map((score, index) => {
    const x = scores.length === 1 ? 8 : 8 + (index / (scores.length - 1)) * 504;
    const y = 166 - ((score - 40) / 60) * 136;
    return `${Math.round(x)} ${Math.round(Math.max(24, Math.min(166, y)))}`;
  });
  const line = `M${points.join('L')}`;
  document.querySelector('#mock-chart-line').setAttribute('d', line);
  document.querySelector('#mock-chart-area').setAttribute('d', `${line}V184H8Z`);
  document.querySelector('#mock-chart').setAttribute('aria-label', `Результат пробников вырос с ${firstScore} до ${lastScore} баллов`);
  document.querySelector('#score-delta-value').textContent = `+${Math.max(0, lastScore - firstScore)}`;
  document.querySelector('#last-score').textContent = `${lastScore} баллов`;
  document.querySelector('#month-target').textContent = `${Math.min(100, lastScore + 5)} баллов`;
  document.querySelector('#next-test-copy').textContent = studentState.mockTests.length > 3
    ? 'Новый мини-пробник уже учтён. Маршрут поднял приоритет темы с самыми частыми ошибками.'
    : 'Пятница, 17:00. После проверки маршрут обновит приоритеты и план на следующую неделю.';

  const history = document.querySelector('#mock-history');
  history.innerHTML = '';
  studentState.mockTests.forEach((test) => {
    const row = document.createElement('div');
    const label = document.createElement('span');
    const value = document.createElement('strong');
    label.textContent = test.title;
    value.textContent = `${test.score} баллов`;
    row.append(label, value);
    history.append(row);
  });
}

function renderMentorState() {
  const history = document.querySelector('#mentor-history');
  history.innerHTML = '';
  studentState.mentorMessages.slice(-5).forEach((message) => {
    const row = document.createElement('div');
    const label = document.createElement('span');
    const text = document.createElement('strong');
    label.textContent = message.role === 'student' ? 'Вы' : message.title || 'Мария';
    text.textContent = message.text;
    row.append(label, text);
    history.append(row);
  });
  document.querySelector('#demo-mentor-copy').textContent = studentState.mentorMessages.filter((message) => message.role === 'mentor').at(-1)?.text || studentState.reviewStatus;
}

function renderSummaryState() {
  const { completed, total } = getTaskCompletion();
  const first = studentState.mockTests[0].score;
  const last = studentState.mockTests.at(-1).score;
  document.querySelector('#summary-regularity').textContent = `${completed} задачи из ${total} сегодня`;
  document.querySelector('#summary-dynamics').textContent = `+${Math.max(0, last - first)} баллов за ${studentState.mockTests.length} пробника`;
  document.querySelector('#summary-comment').textContent = studentState.summaryComment;
}

function completeTask(taskId, completed) {
  const task = studentState.tasks.find((item) => item.id === taskId);
  if (!task) return;
  task.completed = completed;
  studentState.routeUpdatedAt = new Date().toISOString();
  studentState.summaryComment = completed
    ? 'Задача закрыта и учтена в маршруте. Следующий шаг зависит от тренировки по активной теме.'
    : 'Задача вернулась в маршрут дня, прогресс пересчитан без потери остальных результатов.';
  saveStudentState();
  renderDashboard();
}

function startPractice(topicId = null) {
  if (topicId) studentState.practiceSession.activeTopicId = topicId;
  const activeTopic = getActiveTopic();
  studentState.practiceSession.status = 'active';
  studentState.practiceSession.questions = getPracticeQuestions(activeTopic?.title || 'фокус недели').map((question) => ({
    ...question,
    answer: null
  }));
  studentState.practiceSession.lastScore = null;
  saveStudentState();
  activateDashboardTab('practice');
  renderDashboard();
}

function submitPracticeAnswer(questionId, answerIndex) {
  const question = studentState.practiceSession.questions.find((item) => item.id === questionId);
  if (!question || question.answer !== null) return;
  question.answer = answerIndex;
  const answered = studentState.practiceSession.questions.every((item) => item.answer !== null);
  if (answered) {
    const score = studentState.practiceSession.questions.filter((item) => item.answer === item.correct).length;
    const activeTopic = getActiveTopic();
    studentState.practiceSession.status = 'completed';
    studentState.practiceSession.lastScore = score;
    studentState.practiceSession.solved = Math.min(studentState.practiceSession.total, studentState.practiceSession.solved + studentState.practiceSession.questions.length);
    if (activeTopic) {
      activeTopic.progress = Math.min(100, activeTopic.progress + 12 + score * 4);
      activeTopic.errors = Math.max(0, activeTopic.errors - Math.max(1, score));
      activeTopic.status = activeTopic.errors === 0 ? 'закреплено' : 'нужен разбор ошибок';
    }
    const practiceTask = studentState.tasks.find((task) => /трениров|практик|задан/i.test(task.title));
    if (practiceTask) practiceTask.completed = true;
    studentState.reviewStatus = 'Тренировка отправлена. Наставник оставил короткий комментарий в разделе связи.';
    studentState.summaryComment = `Тренировка по теме «${activeTopic?.title || 'фокус недели'}» завершена. Следующий шаг, мини-пробник.`;
    studentState.mentorMessages.push({
      id: `mentor-practice-${Date.now()}`,
      role: 'mentor',
      title: 'Мария',
      text: score >= 2
        ? 'Хорошая тренировка. Теперь закрепляем результат мини-пробником, чтобы маршрут обновил приоритеты.'
        : 'Ошибки видны. Не добавляем новую тему, сначала закрепим текущую коротким повторением.'
    });
    studentState.routeUpdatedAt = new Date().toISOString();
  }
  saveStudentState();
  renderDashboard();
}

function finishMockTest() {
  const lastScore = studentState.mockTests.at(-1).score;
  const practiceScore = studentState.practiceSession.lastScore ?? 1;
  const nextScore = Math.min(100, lastScore + 2 + practiceScore);
  const activeTopic = getActiveTopic();
  studentState.mockTests.push({
    id: `mock-${Date.now()}`,
    title: `Мини-пробник ${studentState.mockTests.length + 1}`,
    score: nextScore
  });
  if (activeTopic) {
    activeTopic.progress = Math.min(100, activeTopic.progress + 10);
    activeTopic.errors = Math.max(0, activeTopic.errors - 1);
    activeTopic.priority = activeTopic.errors === 0 ? 'закреплено' : 'остался разбор';
  }
  const mockTask = studentState.tasks.find((task) => /пробник|провер/i.test(task.title));
  if (mockTask) mockTask.completed = true;
  studentState.reviewStatus = 'Мини-пробник проверен. Маршрут обновил фокус недели.';
  studentState.summaryComment = `После мини-пробника результат стал ${nextScore} баллов. Активный фокус обновлён по ошибкам.`;
  studentState.mentorMessages.push({
    id: `mentor-mock-${Date.now()}`,
    role: 'mentor',
    title: 'Мария',
    text: `Мини-пробник учтён: ${nextScore} баллов. Теперь держим фокус на теме «${activeTopic?.title || 'текущая тема'}».`
  });
  studentState.routeUpdatedAt = new Date().toISOString();
  saveStudentState();
  renderDashboard();
  showToast('Мини-пробник добавлен. График, задачи и комментарий наставника обновлены.');
}

function addMentorQuestion(text) {
  const cleanText = text.trim();
  if (!cleanText) return false;
  const activeTopic = getActiveTopic();
  studentState.mentorMessages.push({
    id: `student-${Date.now()}`,
    role: 'student',
    title: 'Вы',
    text: cleanText
  });
  studentState.mentorMessages.push({
    id: `mentor-answer-${Date.now()}`,
    role: 'mentor',
    title: 'Мария',
    text: `Отвечаю по маршруту: сейчас главный фокус, тема «${activeTopic?.title || 'текущая тема'}». Закройте тренировку и мини-пробник, потом добавим следующий блок.`
  });
  studentState.reviewStatus = 'Наставник ответил в истории сообщений.';
  studentState.routeUpdatedAt = new Date().toISOString();
  saveStudentState();
  renderDashboard();
  return true;
}

function setSiteInert(value) {
  siteShells.forEach((node) => {
    if (value) node.setAttribute('inert', '');
    else node.removeAttribute('inert');
  });
}

function getFormValue(form, name) {
  const field = form.elements[name];
  if (!field) return '';
  if (field instanceof RadioNodeList) return field.value;
  return field.value;
}

function getDiagnosticState() {
  const grade = getFormValue(diagnosticForm, 'grade') || '11 класс';
  const exam = getFormValue(diagnosticForm, 'exam') || 'ЕГЭ';
  const subject = getFormValue(diagnosticForm, 'subject') || 'математике';
  const goal = getFormValue(diagnosticForm, 'goal') || '85+';
  const level = getFormValue(diagnosticForm, 'level') || 'средний';
  const time = getFormValue(diagnosticForm, 'time') || '3-5 часов';
  const problem = getFormValue(diagnosticForm, 'problem') || 'Не хватает практики';
  const subjectName = subjectNames[subject] || subject;
  return {
    grade,
    exam,
    subject,
    subjectLabel: subjectLabels[subject] || subject,
    subjectName,
    goal,
    level,
    time,
    problem,
    profile: buildRouteProfile(subjectName, problem, time)
  };
}

function renderTopicTags(container, topics) {
  if (!container) return;
  container.innerHTML = '';
  topics.forEach((topic, index) => {
    const item = document.createElement('span');
    item.className = index === 0 ? 'hot' : index === 1 ? 'warm' : 'cool';
    item.textContent = topic;
    container.append(item);
  });
}

function renderWeekSchedule(container, plan) {
  if (!container) return;
  const days = ['Пн', 'Ср', 'Пт'];
  container.innerHTML = '';
  plan.slice(1, 4).forEach((item, index) => {
    const row = document.createElement('div');
    const day = document.createElement('span');
    const title = document.createElement('strong');
    day.textContent = days[index] || 'Вс';
    title.textContent = item;
    row.append(day, title);
    container.append(row);
  });
}

function renderTaskStack(container, plan) {
  if (!container) return;
  container.innerHTML = '';
  plan.slice(0, 3).forEach((item, index) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = index < 2;
    label.append(input, ` ${item}`);
    container.append(label);
  });
}

function updatePreview() {
  const state = getDiagnosticState();
  document.querySelector('#preview-goal').textContent = `${state.exam}, ${state.subjectName}, ${state.goal}`;
  document.querySelector('#preview-risk').textContent = state.profile.risk;
  document.querySelector('#preview-week').textContent = state.profile.pace;
}

function updateResult() {
  const state = getDiagnosticState();
  document.querySelector('#result-title').textContent = `${state.exam} по ${state.subjectLabel} на ${state.goal}`;
  document.querySelector('#result-summary').textContent = `Маршрут собран: ${state.grade}, ${state.level} уровень, ${state.time} в неделю. ${state.profile.summary}`;
  document.querySelector('#result-grade').textContent = state.grade;
  document.querySelector('#result-level').textContent = state.level;
  document.querySelector('#result-risk').textContent = state.profile.risk;
  document.querySelector('#result-pace').textContent = `${state.profile.pace}, ${state.time}`;
  document.querySelector('#result-next').textContent = state.profile.next;
  document.querySelector('#result-mentor').textContent = state.profile.mentor;

  const weekList = document.querySelector('#week-plan-list');
  weekList.innerHTML = '';
  state.profile.plan.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    weekList.append(li);
  });

  renderWeekSchedule(document.querySelector('#demo-week-schedule'), state.profile.plan);
  renderTopicTags(document.querySelector('#result-topics'), state.profile.topics);
  syncStudentState(state);
  renderDashboard();
}

function getTariff(format) {
  return tariffCatalog[format] || {
    title: format,
    price: 'подбор после диагностики',
    summary: 'Наставник уточнит цель, предмет, текущий уровень и главную сложность перед стартом.'
  };
}

function updateLeadDialog(format) {
  const state = getDiagnosticState();
  const tariff = getTariff(format);
  const input = leadDialog.querySelector('input[name="format"]');
  const title = leadDialog.querySelector('#lead-title');
  const summary = leadDialog.querySelector('#lead-format-summary');
  const gradeField = leadDialog.querySelector('[name="leadGrade"]');
  const examField = leadDialog.querySelector('[name="leadExam"]');
  const subjectField = leadDialog.querySelector('[name="leadSubject"]');
  const goalField = leadDialog.querySelector('[name="leadGoal"]');
  const problemField = leadDialog.querySelector('[name="leadProblem"]');
  input.value = tariff.title;
  title.textContent = tariff.title.includes('Консультация')
    ? 'Запишем на консультацию'
    : 'Получите стартовый маршрут и подходящий формат';
  summary.innerHTML = `<span>Формат выбран: ${tariff.title}</span><strong>${tariff.summary} Мы добавили его в заявку вместе с целью ${state.goal} и сложностью “${state.problem}”.</strong>`;
  if (gradeField) gradeField.value = state.grade;
  if (examField) examField.value = state.exam;
  if (subjectField) subjectField.value = state.subjectName;
  if (goalField) goalField.value = state.goal;
  if (problemField) problemField.value = state.problem;
}

function activateDashboardTab(target = 'today') {
  document.querySelectorAll('[data-dashboard-tab]').forEach((node) => {
    const isActive = node.getAttribute('data-dashboard-tab') === target;
    node.classList.toggle('active', isActive);
    node.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.querySelectorAll('[data-tab-panel]').forEach((panel) => {
    const isActive = panel.getAttribute('data-tab-panel') === target;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });
}

function openView(view) {
  setSiteInert(true);
  resultView.hidden = true;
  demoView.hidden = true;
  view.hidden = false;
  view.scrollTop = 0;
  body.classList.add('view-open');
  const target = view.querySelector('main');
  window.setTimeout(() => {
    target?.focus({ preventScroll: true });
    view.scrollTop = 0;
  }, 0);
}

function closeViews() {
  resultView.hidden = true;
  demoView.hidden = true;
  body.classList.remove('view-open');
  setSiteInert(false);
}

function openDialog(dialog) {
  if (!dialog) return;
  dialog.showModal();
  body.classList.add('modal-open');
  dialog.querySelector('input, select, textarea, button')?.focus();
}

function closeDialog(dialog) {
  if (!dialog) return;
  dialog.close();
  body.classList.remove('modal-open');
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 4600);
}

function validateLeadForm(form) {
  const requiredFields = [...form.querySelectorAll('[required]')];
  let valid = true;
  requiredFields.forEach((field) => {
    const wrapper = field.closest('.field');
    const isEmpty = !field.value.trim();
    wrapper?.classList.toggle('has-error', isEmpty);
    if (isEmpty) valid = false;
  });
  const contact = form.elements.contact;
  if (contact && contact.value.trim().length > 0 && !/^(@[a-zA-Z0-9_]{4,}|[+\d][\d\s().-]{5,})$/.test(contact.value.trim())) {
    contact.closest('.field')?.classList.add('has-error');
    valid = false;
  }
  return valid;
}

document.querySelectorAll('[data-start-diagnostic]').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => diagnosticForm?.querySelector('input, select, button')?.focus(), 260);
  });
});

diagnosticForm?.addEventListener('change', updatePreview);

diagnosticForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  updateResult();
  openView(resultView);
});

document.querySelectorAll('[data-open-result]').forEach((button) => {
  button.addEventListener('click', () => {
    updateResult();
    openView(resultView);
  });
});

document.querySelectorAll('[data-open-demo]').forEach((button) => {
  button.addEventListener('click', () => {
    updateResult();
    activateDashboardTab('today');
    openView(demoView);
  });
});

document.querySelectorAll('[data-back-site]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    closeViews();
    document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-open-lead]').forEach((button) => {
  button.addEventListener('click', () => {
    const format = button.getAttribute('data-format') || 'Формат подготовки';
    updateLeadDialog(format);
    openDialog(leadDialog);
  });
});

document.querySelectorAll('[data-close-dialog]').forEach((button) => {
  button.addEventListener('click', () => closeDialog(button.closest('dialog')));
});

leadDialog?.addEventListener('close', () => {
  body.classList.remove('modal-open');
  const form = leadDialog.querySelector('form');
  form.classList.remove('is-submitted');
  const submitButton = form.querySelector('[data-submit-lead]');
  submitButton.disabled = false;
  submitButton.textContent = 'Получить маршрут и формат';
  leadDialog.querySelector('.form-status').textContent = '';
  leadDialog.querySelectorAll('.has-error').forEach((field) => field.classList.remove('has-error'));
});

leadDialog?.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  if (!validateLeadForm(form)) {
    status.textContent = 'Проверьте контакт: наставник сможет связаться с вами только по телефону или Telegram.';
    return;
  }
  const selectedFormat = form.elements.format.value || 'подобранный формат';
  const goal = form.elements.leadGoal.value;
  const subject = form.elements.leadSubject.value;
  const problem = form.elements.leadProblem.value;
  form.classList.add('is-submitted');
  status.textContent = `Готово. Мы сохранили цель ${goal}, предмет “${subject}”, главную сложность “${problem}” и формат “${selectedFormat}”. Наставник покажет стартовый маршрут и поможет выбрать нагрузку без перегруза.`;
  const submitButton = form.querySelector('[data-submit-lead]');
  submitButton.disabled = true;
  submitButton.textContent = 'Заявка принята';
  showToast('Готово. Цель, предмет и главная сложность сохранены.');
});

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('is-open', !isOpen);
});

navMenu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navToggle?.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  }
});

document.querySelectorAll('[data-dashboard-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    activateDashboardTab(tab.getAttribute('data-dashboard-tab'));
  });
});

document.addEventListener('click', (event) => {
  const practiceButton = event.target.closest('[data-start-practice]');
  if (practiceButton) {
    startPractice();
    return;
  }

  const topicButton = event.target.closest('[data-topic-id]');
  if (topicButton) {
    studentState.practiceSession.activeTopicId = topicButton.dataset.topicId;
    studentState.practiceSession.status = 'idle';
    studentState.practiceSession.questions = [];
    saveStudentState();
    renderDashboard();
    return;
  }

  const answerButton = event.target.closest('[data-question-id][data-answer-index]');
  if (answerButton) {
    submitPracticeAnswer(answerButton.dataset.questionId, Number(answerButton.dataset.answerIndex));
    return;
  }

  if (event.target.closest('[data-finish-mock]')) {
    finishMockTest();
    return;
  }

  if (event.target.closest('[data-reset-demo]')) {
    window.localStorage.removeItem(STORAGE_KEY);
    studentState = buildDefaultState(getDiagnosticState());
    saveStudentState();
    activateDashboardTab('today');
    renderDashboard();
    showToast('Демо кабинета сброшено. Можно пройти сценарий заново.');
  }
});

document.querySelector('#demo-task-stack')?.addEventListener('change', (event) => {
  const input = event.target.closest('[data-task-id]');
  if (!input) return;
  completeTask(input.dataset.taskId, input.checked);
});

document.querySelector('#mentor-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const question = form.elements.question;
  if (addMentorQuestion(question.value)) {
    question.value = '';
    showToast('Вопрос отправлен. Наставник ответил в истории сообщений.');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && (!resultView.hidden || !demoView.hidden)) closeViews();
});

function revealVisibleNow() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05) node.classList.add('is-visible');
  });
}

function updateMobileStickyCta() {
  const stickyCta = document.querySelector('.mobile-sticky-cta');
  if (!stickyCta) return;
  const hero = document.querySelector('.hero');
  const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 520;
  const shouldShow = window.innerWidth <= 640 && window.scrollY > heroBottom - 24;
  stickyCta.classList.toggle('is-visible', shouldShow);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));
activateDashboardTab('today');
updatePreview();
studentState = loadStudentState();
renderDashboard();
body.classList.add('motion-ready');
revealVisibleNow();
updateMobileStickyCta();
window.addEventListener('load', revealVisibleNow);
window.addEventListener('load', updateMobileStickyCta);
window.addEventListener('scroll', updateMobileStickyCta, { passive: true });
window.addEventListener('resize', updateMobileStickyCta);
window.setTimeout(revealVisibleNow, 250);
window.setTimeout(updateMobileStickyCta, 250);
