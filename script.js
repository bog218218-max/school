const body = document.body;
const siteShells = document.querySelectorAll('[data-shell="site"]');
const resultView = document.querySelector('#result-view');
const demoView = document.querySelector('#demo-view');
const leadDialog = document.querySelector('#lead-dialog');
const toast = document.querySelector('.toast');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const diagnosticForm = document.querySelector('#diagnostic-form');

const routeProfiles = {
  'Не понимаю, что учить': {
    risk: 'Нет порядка тем',
    pace: '4 шага в неделю',
    next: 'Пройти короткую диагностику по базовым темам и расставить темы по влиянию на балл.',
    mentor: 'Сначала собираем карту тем. Не добавляем материалы, пока не понятно, какие блоки дают самый быстрый рост.',
    topics: ['Базовые темы', 'Алгебра', 'План повторения'],
    plan: ['Диагностика по базовым темам', 'Карта приоритетов', '2 тренировки по первому блоку', 'Мини-проверка', 'Обновление маршрута']
  },
  'Не хватает практики': {
    risk: 'Не хватает регулярной практики',
    pace: '5 шагов в неделю',
    next: 'Пройти короткий пробник на 25 минут, чтобы уточнить слабые темы.',
    mentor: 'Ставим регулярную практику и фиксируем ошибки. Через неделю маршрут обновится по результатам мини-пробника.',
    topics: ['Производная', 'Параметры', 'Текстовые задачи'],
    plan: ['Диагностика по базовым темам', 'Разбор ошибок', '3 тренировки по слабым заданиям', 'Мини-пробник в конце недели', 'Обновление маршрута']
  },
  'Боюсь не успеть': {
    risk: 'Нужен реалистичный темп',
    pace: '4 шага без перегруза',
    next: 'Собрать план на 7 дней с двумя короткими тренировками и одной контрольной точкой.',
    mentor: 'Разделяем подготовку на короткие блоки. Сейчас важнее стабильность, чем попытка закрыть всё сразу.',
    topics: ['План недели', 'Повторение', 'Контрольная точка'],
    plan: ['Короткая диагностика', 'План тем на неделю', 'Тренировка без перегруза', 'Контрольная точка', 'Комментарий наставника']
  },
  'Не вижу прогресс': {
    risk: 'Прогресс не виден по темам',
    pace: '5 измеримых шагов',
    next: 'Зафиксировать стартовый результат и отметить темы, которые уже можно закрыть.',
    mentor: 'Собираем прогресс в одну картину: темы, задания, пробники и ошибки. Так движение становится заметным.',
    topics: ['Стартовый балл', 'Закрытые темы', 'Ошибки пробника'],
    plan: ['Стартовый пробник', 'Отметка закрытых тем', 'План по слабым местам', 'Промежуточная проверка', 'Отчёт по изменениям']
  },
  'Нужна помощь со второй частью': {
    risk: 'Нужна проверка сложных решений',
    pace: '3 глубоких разбора',
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
  const exam = getFormValue(diagnosticForm, 'exam') || 'ЕГЭ';
  const subject = getFormValue(diagnosticForm, 'subject') || 'математике';
  const goal = getFormValue(diagnosticForm, 'goal') || '85+';
  const level = getFormValue(diagnosticForm, 'level') || 'средний';
  const problem = getFormValue(diagnosticForm, 'problem') || 'Не хватает практики';
  return {
    exam,
    subject,
    subjectLabel: subjectLabels[subject] || subject,
    goal,
    level,
    problem,
    profile: routeProfiles[problem] || routeProfiles['Не хватает практики']
  };
}

function renderTopicTags(container, topics) {
  container.innerHTML = '';
  topics.forEach((topic, index) => {
    const item = document.createElement('span');
    item.className = index === 0 ? 'hot' : index === 1 ? 'warm' : 'cool';
    item.textContent = topic;
    container.append(item);
  });
}

function updatePreview() {
  const state = getDiagnosticState();
  document.querySelector('#preview-goal').textContent = `${state.exam}, ${state.subjectLabel}, ${state.goal}`;
  document.querySelector('#preview-risk').textContent = state.profile.risk;
  document.querySelector('#preview-week').textContent = state.profile.pace;
}

function updateResult() {
  const state = getDiagnosticState();
  document.querySelector('#result-title').textContent = `${state.exam} по ${state.subjectLabel} на ${state.goal}`;
  document.querySelector('#result-level').textContent = state.level;
  document.querySelector('#result-risk').textContent = state.profile.risk;
  document.querySelector('#result-pace').textContent = state.profile.pace;
  document.querySelector('#result-next').textContent = state.profile.next;
  document.querySelector('#result-mentor').textContent = state.profile.mentor;
  document.querySelector('#demo-goal').textContent = `Цель: ${state.exam} по ${state.subjectLabel} на ${state.goal}`;
  document.querySelector('#demo-next-title').textContent = state.profile.topics[0] ? `Практика по теме «${state.profile.topics[0]}»` : 'Практика по слабой теме';
  document.querySelector('#demo-next-copy').textContent = state.profile.next;
  document.querySelector('#demo-mentor-copy').textContent = state.profile.mentor;

  const weekList = document.querySelector('#week-plan-list');
  weekList.innerHTML = '';
  state.profile.plan.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    weekList.append(li);
  });

  renderTopicTags(document.querySelector('#result-topics'), state.profile.topics);

  const demoTopics = document.querySelector('#demo-topics');
  demoTopics.innerHTML = '';
  state.profile.topics.forEach((topic, index) => {
    const row = document.createElement('div');
    row.innerHTML = `<strong>${topic}</strong><span>${index === 0 ? 'высокий приоритет' : index === 1 ? 'следующий фокус' : 'поддерживающая практика'}</span>`;
    demoTopics.append(row);
  });
}

function openView(view) {
  setSiteInert(true);
  resultView.hidden = true;
  demoView.hidden = true;
  view.hidden = false;
  body.classList.add('view-open');
  const target = view.querySelector('main');
  window.setTimeout(() => target?.focus(), 0);
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
    const input = leadDialog.querySelector('input[name="format"]');
    const title = leadDialog.querySelector('#lead-title');
    input.value = format;
    title.textContent = format.includes('Консультация') ? 'Запишем на консультацию' : `Формат: ${format}`;
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
    status.textContent = 'Заполните имя, класс, предмет и контакт, чтобы увидеть демо-подтверждение.';
    return;
  }
  closeDialog(leadDialog);
  form.reset();
  showToast('Демо-заявка принята. В реальном продукте наставник получил бы её в CRM.');
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
    const target = tab.getAttribute('data-dashboard-tab');
    document.querySelectorAll('[data-dashboard-tab]').forEach((node) => {
      node.classList.toggle('active', node === tab);
    });
    document.querySelectorAll('[data-tab-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === target);
    });
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
updatePreview();
body.classList.add('motion-ready');
revealVisibleNow();
window.addEventListener('load', revealVisibleNow);
window.setTimeout(revealVisibleNow, 250);
