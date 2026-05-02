const body = document.body;
const siteShells = document.querySelectorAll('[data-shell="site"]');
const resultView = document.querySelector('#result-view');
const demoView = document.querySelector('#demo-view');
const leadDialog = document.querySelector('#lead-dialog');
const toast = document.querySelector('.toast');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const diagnosticForm = document.querySelector('#diagnostic-form');

const tariffCatalog = {
  Start: {
    title: 'Start',
    price: '3 900 ₽/мес',
    summary: 'Маршрут, тренажёр, пробники и прогресс без регулярного наставника.'
  },
  Plus: {
    title: 'Plus',
    price: '6 900 ₽/мес',
    summary: 'Наставник, еженедельный отчёт, разбор ошибок и родительская сводка.'
  },
  Max: {
    title: 'Max',
    price: '12 900 ₽/мес',
    summary: 'Индивидуальные консультации, проверка второй части и усиленный маршрут.'
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
    summary: 'Подберём формат после короткой диагностики и цели ученика.'
  }
};

const routeProfiles = {
  'Не понимаю, что учить': {
    risk: 'Нет порядка тем',
    pace: '4 шага в неделю',
    summary: 'Маршрут начнётся с карты тем и коротких проверок, чтобы убрать случайный выбор материалов.',
    next: 'Пройти короткую диагностику по базовым темам и расставить темы по влиянию на балл.',
    mentor: 'Сначала собираем карту тем. Не добавляем материалы, пока не понятно, какие блоки дают самый быстрый рост.',
    topics: ['Базовые темы', 'Алгебра', 'План повторения'],
    plan: ['Диагностика по базовым темам', 'Карта приоритетов', '2 тренировки по первому блоку', 'Мини-проверка', 'Отчёт родителю']
  },
  'Не хватает практики': {
    risk: 'Не хватает регулярной практики',
    pace: '5 шагов в неделю',
    summary: 'Первая неделя делает практику регулярной: короткие задания, фиксация ошибок и мини-пробник.',
    next: 'Пройти короткий пробник на 25 минут, чтобы уточнить слабые темы.',
    mentor: 'Ставим регулярную практику и фиксируем ошибки. Через неделю маршрут обновится по результатам мини-пробника.',
    topics: ['Производная', 'Параметры', 'Текстовые задачи'],
    plan: ['Диагностика по базовым темам', 'Разбор ошибок', '3 тренировки по слабым заданиям', 'Мини-пробник в конце недели', 'Обновление маршрута']
  },
  'Сложно держать темп': {
    risk: 'Нужен реалистичный темп',
    pace: '4 шага без перегруза',
    summary: 'Маршрут удерживает спокойный темп: меньше случайных задач, больше контрольных точек.',
    next: 'Собрать план на 7 дней с двумя короткими тренировками и одной контрольной точкой.',
    mentor: 'Разделяем подготовку на короткие блоки. Сейчас важнее стабильность, чем попытка закрыть всё сразу.',
    topics: ['План недели', 'Повторение', 'Контрольная точка'],
    plan: ['Короткая диагностика', 'План тем на неделю', 'Тренировка без перегруза', 'Контрольная точка', 'Комментарий наставника']
  },
  'Не вижу прогресс': {
    risk: 'Прогресс не виден по темам',
    pace: '5 измеримых шагов',
    summary: 'Система собирает прогресс в одну картину: темы, задания, пробники, ошибки и отчёт.',
    next: 'Зафиксировать стартовый результат и отметить темы, которые уже можно закрыть.',
    mentor: 'Собираем прогресс в одну картину: темы, задания, пробники и ошибки. Так движение становится заметным.',
    topics: ['Стартовый балл', 'Закрытые темы', 'Ошибки пробника'],
    plan: ['Стартовый пробник', 'Отметка закрытых тем', 'План по слабым местам', 'Промежуточная проверка', 'Отчёт по изменениям']
  },
  'Нужна помощь со второй частью': {
    risk: 'Нужна проверка сложных решений',
    pace: '3 глубоких разбора',
    summary: 'Главный фокус недели, не объём заданий, а качество решения, оформление и обратная связь.',
    next: 'Разобрать одно задание второй части и отметить повторяющиеся ошибки в решении.',
    mentor: 'Работаем не объёмом, а качеством решения. Вторая часть требует проверки логики и оформления.',
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
  const problem = getFormValue(diagnosticForm, 'problem') || 'Не хватает практики';
  return {
    grade,
    exam,
    subject,
    subjectLabel: subjectLabels[subject] || subject,
    subjectName: subjectNames[subject] || subject,
    goal,
    level,
    problem,
    profile: routeProfiles[problem] || routeProfiles['Не хватает практики']
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
  document.querySelector('#result-summary').textContent = `${state.grade}, ${state.level} уровень. ${state.profile.summary}`;
  document.querySelector('#result-grade').textContent = state.grade;
  document.querySelector('#result-level').textContent = state.level;
  document.querySelector('#result-risk').textContent = state.profile.risk;
  document.querySelector('#result-pace').textContent = state.profile.pace;
  document.querySelector('#result-next').textContent = state.profile.next;
  document.querySelector('#result-mentor').textContent = state.profile.mentor;
  document.querySelector('#demo-greeting').textContent = `Кабинет: ${state.grade}`;
  document.querySelector('#demo-goal').textContent = `Цель: ${state.exam} по ${state.subjectLabel} на ${state.goal}`;
  document.querySelector('#demo-next-title').textContent = state.profile.topics[0] ? `Практика по теме «${state.profile.topics[0]}»` : 'Практика по слабой теме';
  document.querySelector('#demo-next-copy').textContent = state.profile.next;
  document.querySelector('#demo-mentor-copy').textContent = state.profile.mentor;
  document.querySelector('#demo-progress-copy').textContent = `В фокусе ${state.profile.topics.length} темы. План держит цель ${state.goal} и текущий риск.`;
  document.querySelector('#demo-practice-copy').textContent = `${state.profile.pace}: практика строится вокруг выбранной проблемы «${state.problem.toLowerCase()}».`;
  document.querySelector('#demo-parent-focus').textContent = state.profile.topics.slice(0, 2).join(' и ');

  const weekList = document.querySelector('#week-plan-list');
  weekList.innerHTML = '';
  state.profile.plan.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    weekList.append(li);
  });

  renderWeekSchedule(document.querySelector('#demo-week-schedule'), state.profile.plan);
  renderTaskStack(document.querySelector('#demo-task-stack'), state.profile.plan);
  renderTopicTags(document.querySelector('#result-topics'), state.profile.topics);

  const demoTopics = document.querySelector('#demo-topics');
  demoTopics.innerHTML = '';
  state.profile.topics.forEach((topic, index) => {
    const row = document.createElement('div');
    row.innerHTML = `<strong>${topic}</strong><span>${index === 0 ? 'высокий приоритет' : index === 1 ? 'следующий фокус' : 'поддерживающая практика'}</span>`;
    demoTopics.append(row);
  });
}

function getTariff(format) {
  return tariffCatalog[format] || {
    title: format,
    price: 'подбор после диагностики',
    summary: 'Наставник уточнит цель, предмет и текущий уровень перед стартом.'
  };
}

function updateLeadDialog(format) {
  const state = getDiagnosticState();
  const tariff = getTariff(format);
  const input = leadDialog.querySelector('input[name="format"]');
  const title = leadDialog.querySelector('#lead-title');
  const summary = leadDialog.querySelector('#lead-format-summary');
  const gradeField = leadDialog.querySelector('[name="leadGrade"]');
  const subjectField = leadDialog.querySelector('[name="leadSubject"]');
  input.value = tariff.title;
  title.textContent = tariff.title.includes('Консультация') ? 'Запишем на консультацию' : `Формат: ${tariff.title}`;
  summary.innerHTML = `<span>${tariff.price}</span><strong>${tariff.summary}</strong>`;
  if (gradeField && !gradeField.value) gradeField.value = state.grade;
  if (subjectField && !subjectField.value) subjectField.value = state.subjectName;
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
  if (contact && contact.value.trim().length > 0 && contact.value.trim().length < 5) {
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
  leadDialog.querySelector('.form-status').textContent = '';
  leadDialog.querySelectorAll('.has-error').forEach((field) => field.classList.remove('has-error'));
});

leadDialog?.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  if (!validateLeadForm(form)) {
    status.textContent = 'Заполните имя, класс, предмет и контакт. Контакт должен быть телефоном или Telegram, чтобы наставник мог прислать стартовый маршрут.';
    return;
  }
  const selectedFormat = form.elements.format.value || 'подобранный формат';
  closeDialog(leadDialog);
  form.reset();
  showToast(`Заявка на ${selectedFormat} собрана. Следующий шаг: наставник связывается, уточняет цель и открывает стартовый маршрут.`);
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && (!resultView.hidden || !demoView.hidden)) closeViews();
});

function revealVisibleNow() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((node) => {
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05) node.classList.add('is-visible');
  });
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
body.classList.add('motion-ready');
revealVisibleNow();
window.addEventListener('load', revealVisibleNow);
window.setTimeout(revealVisibleNow, 250);
