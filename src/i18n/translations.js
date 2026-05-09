export const LANGUAGE_OPTIONS = ["es", "en"];

export const CATEGORY_LABELS = {
  vivienda: { es: "Vivienda", en: "Housing" },
  alimentacion: { es: "Alimentacion", en: "Food" },
  transporte: { es: "Transporte", en: "Transport" },
  suscripciones: { es: "Suscripciones", en: "Subscriptions" },
  ocio: { es: "Ocio", en: "Leisure" },
  salud: { es: "Salud", en: "Health" },
  ahorro: { es: "Ahorro", en: "Savings" },
  otros: { es: "Otros", en: "Other" },
};

const translations = {
  es: {
    app: {
      languageName: "Español",
      primaryNavigation: "Navegacion principal",
    },
    hero: {
      eyebrow: "Control mensual",
      title: "Gastos claros, decisiones mejores.",
      description:
        "Organiza tus pagos por categorias, revisa el mes actual y detecta patrones antes de que afecten a tus cuentas.",
      emptyTitle: "Sin movimientos todavia",
      emptyDescription:
        "Anade tu primer gasto para llenar el resumen del mes, activar las metricas y ver tendencias.",
      activeMonth: "Mes activo",
      monthlyTotal: "Total mensual",
      movements: "Movimientos",
      averagePerExpense: "Media por gasto",
      dominantCategory: "Categoria dominante",
      monthBudget: "Presupuesto del mes",
      noData: "Sin datos",
    },
    nav: {
      expenses: "Gastos",
      analytics: "Metricas",
    },
    common: {
      close: "Cerrar",
      closeDialog: "Cerrar dialogo",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      done: "Listo",
      options: "Opciones",
      language: "Idioma",
      spanish: "Español",
      english: "Ingles",
      noNote: "Sin nota",
      logOut: "Cerrar sesion",
      newExpense: "Nuevo gasto",
      saveChanges: "Guardar cambios",
      activeMonth: "Mes activo",
      warningThreshold: "Aviso preventivo",
      closeOptions: "Cerrar opciones",
    },
    expensesPage: {
      monthlyViewTitle: "Vista mensual",
      monthlyViewSubtitle:
        "Revisa el estado del mes activo y cambia rapidamente entre historicos.",
      overBudgetTitle: "Presupuesto al limite",
      trackingEyebrow: "Seguimiento",
      nearBudgetSubtitle:
        "El aviso preventivo salta al {{threshold}}% y ahora hay {{count}} categorias cerca del tope.",
      movementsTitle: "Movimientos del mes",
      movementsSubtitle:
        "{{visible}} de {{total}} gastos visibles en el periodo seleccionado.",
      budgetPlannerTitle: "Presupuestos por categoria",
      budgetPlannerSubtitle:
        "Ajusta el limite mensual de cada area y guarda el control en local.",
      optionsTitle: "Opciones",
      optionsSubtitle:
        "Ajusta la experiencia general y revisa el mes activo antes de registrar movimientos.",
      optionsLanguageHelp:
        "Cambia todos los textos visibles de la interfaz entre español e ingles.",
      optionsWarningHelp:
        "Decide a partir de que porcentaje quieres que aparezca el aviso preventivo.",
      optionsMonthHelp:
        "El resumen, las metricas y los presupuestos se estan calculando sobre este periodo.",
      deleteExpenseTitle: "Eliminar gasto",
      deleteExpenseDescription:
        "Esta accion borrara el movimiento de forma permanente.",
      deleteExpenseConfirm: "Eliminar gasto",
      logOutTitle: "Cerrar sesion",
      logOutDescription:
        "Se cerrara la sesion local, se limpiaran los datos guardados en este dispositivo y la aplicacion se reiniciara.",
      logOutConfirm: "Cerrar sesion",
      composeSubtitle:
        "Anade movimientos del mes, corrige errores o registra atrasados.",
      openMainMenu: "Abrir menu principal",
      closeMainMenu: "Cerrar menu principal",
      mainActions: "Acciones principales",
      menuNewExpense: "Nuevo gasto",
      menuOptions: "Opciones",
      menuLogOut: "Cerrar sesion",
      closeExpenseForm: "Cerrar formulario de gasto",
    },
    analyticsPage: {
      trendTitle: "Tendencia por mes",
      trendSubtitle:
        "Compara el volumen de gasto entre el mes actual y los cinco anteriores.",
      categoryTitle: "Peso por categoria",
      categorySubtitle:
        "Detecta de un vistazo donde se concentra el gasto del mes activo.",
      insightsTitle: "Indicadores clave",
      insightsSubtitle:
        "Resumen rapido para entender el ritmo del mes sin duplicar el bloque de presupuesto.",
      budgetTitle: "Seguimiento del presupuesto",
      budgetSubtitle:
        "Comprueba que categorias van dentro de objetivo y cuales necesitan ajuste.",
    },
    expenseForm: {
      title: "Concepto",
      titlePlaceholder: "Ej. Internet, gimnasio, compra...",
      amount: "Importe",
      category: "Categoria",
      date: "Fecha",
      note: "Nota",
      notePlaceholder: "Opcional: contexto del gasto o recordatorio",
      cancel: "Cancelar",
      newSubmit: "Anadir gasto",
    },
    filters: {
      search: "Buscar movimientos",
      searchPlaceholder: "Busca por concepto o nota",
      category: "Categoria",
      allCategories: "Todas las categorias",
      sortBy: "Ordenar por",
      mostRecent: "Fecha mas reciente",
      oldest: "Fecha mas antigua",
      highestAmount: "Importe mas alto",
      lowestAmount: "Importe mas bajo",
      clear: "Limpiar filtros",
    },
    expenseList: {
      emptyTitle: "Sin gastos visibles",
      emptyDescription:
        "No hay gastos para este filtro. Anade el primero o ajusta la busqueda para ver resultados.",
      edit: "Editar",
      delete: "Eliminar",
    },
    budgetAlerts: {
      warningTitle: "Presupuesto casi agotado",
      dangerTitle: "Estas gastando de mas",
      warningEyebrow: "Atencion",
      dangerEyebrow: "Aviso prioritario",
      warningSubtitle:
        "{{count}} categorias ya han consumido casi todo su presupuesto mensual.",
      dangerSubtitle:
        "Ya has sobrepasado {{amount}} en {{count}} categorias del mes actual.",
      spentBudget: "Gasto: {{spent}} / Presupuesto: {{budget}}",
      used: "{{value}}% usado",
    },
    budgetStatus: {
      emptyTitle: "Sin seguimiento presupuestario",
      emptyDescription:
        "Configura presupuestos para obtener alertas y comparativas por categoria.",
      overBudget: "Presupuesto superado",
      remaining: "Margen restante",
    },
    charts: {
      insufficientHistoryTitle: "Sin historico suficiente",
      insufficientHistoryDescription:
        "Aun no hay suficientes datos para comparar la tendencia entre meses.",
      noCategoryBreakdownTitle: "Sin reparto por categoria",
      noCategoryBreakdownDescription:
        "Cuando registres gastos este mes, aqui veras como se distribuyen por categoria.",
      monthTotal: "Total mes",
      ofTotal: "{{value}}% del total",
    },
    monthSelector: {
      emptyTitle: "Sin meses disponibles",
      emptyDescription:
        "Aun no hay meses con movimientos. Anade tu primer gasto para empezar.",
      availableMonths: "Meses disponibles",
    },
    summary: {
      emptyTitle: "Sin resumen mensual",
      emptyDescription:
        "Cuando registres gastos, aqui veras el total, la media y la categoria dominante del mes.",
      monthlyTotal: "Total mensual",
      averagePerExpense: "Media por gasto",
      movementCount: "Numero de movimientos",
      dominantCategory: "Categoria dominante",
      monthBudget: "Presupuesto del mes",
      noData: "Sin datos",
    },
    insights: {
      emptyTitle: "Sin indicadores disponibles",
      emptyDescription:
        "Todavia no hay movimientos en este mes. Registra gastos para desbloquear comparativas e indicadores.",
      totalMonth: "Total del mes",
      variationVsPrevious: "Variacion vs. mes anterior",
      movementCount: "Numero de gastos",
      topCategory: "Categoria principal",
      averagePerMovement: "Media por movimiento",
      noReference: "Sin referencia",
      noDominantCategory: "Sin categoria dominante",
      registeredThisMonth: "{{count}} gastos registrados este mes",
      remainingBudget: "{{amount}} restantes del presupuesto",
      noBudget: "Sin presupuesto definido para comparar",
    },
    warningThreshold: {
      label: "Aviso preventivo",
    },
    collapsible: {
      collapse: "Colapsar {{title}}",
      expand: "Expandir {{title}}",
    },
  },
  en: {
    app: {
      languageName: "English",
      primaryNavigation: "Primary navigation",
    },
    hero: {
      eyebrow: "Monthly control",
      title: "Clear spending, better decisions.",
      description:
        "Organize your payments by category, review the current month, and spot patterns before they affect your finances.",
      emptyTitle: "No transactions yet",
      emptyDescription:
        "Add your first expense to populate the monthly summary, enable metrics, and see trends.",
      activeMonth: "Active month",
      monthlyTotal: "Monthly total",
      movements: "Transactions",
      averagePerExpense: "Average per expense",
      dominantCategory: "Top category",
      monthBudget: "Monthly budget",
      noData: "No data",
    },
    nav: {
      expenses: "Expenses",
      analytics: "Analytics",
    },
    common: {
      close: "Close",
      closeDialog: "Close dialog",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      done: "Done",
      options: "Options",
      language: "Language",
      spanish: "Spanish",
      english: "English",
      noNote: "No note",
      logOut: "Log out",
      newExpense: "New expense",
      saveChanges: "Save changes",
      activeMonth: "Active month",
      warningThreshold: "Warning threshold",
      closeOptions: "Close options",
    },
    expensesPage: {
      monthlyViewTitle: "Monthly overview",
      monthlyViewSubtitle:
        "Review the current month and switch quickly across saved history.",
      overBudgetTitle: "Budget threshold reached",
      trackingEyebrow: "Tracking",
      nearBudgetSubtitle:
        "Preventive warning triggers at {{threshold}}%, and there are now {{count}} categories close to the limit.",
      movementsTitle: "Monthly transactions",
      movementsSubtitle:
        "{{visible}} of {{total}} expenses visible for the selected period.",
      budgetPlannerTitle: "Budgets by category",
      budgetPlannerSubtitle:
        "Adjust the monthly limit for each area and keep it saved locally.",
      optionsTitle: "Options",
      optionsSubtitle:
        "Adjust the overall experience and review the active month before logging new transactions.",
      optionsLanguageHelp:
        "Switch all visible interface text between Spanish and English.",
      optionsWarningHelp:
        "Choose the percentage at which the preventive warning should appear.",
      optionsMonthHelp:
        "Summaries, metrics, and budgets are currently being calculated for this period.",
      deleteExpenseTitle: "Delete expense",
      deleteExpenseDescription:
        "This action will permanently remove the transaction.",
      deleteExpenseConfirm: "Delete expense",
      logOutTitle: "Log out",
      logOutDescription:
        "Your local session will be closed, saved data on this device will be cleared, and the app will restart.",
      logOutConfirm: "Log out",
      composeSubtitle:
        "Add monthly transactions, fix mistakes, or register delayed expenses.",
      openMainMenu: "Open main menu",
      closeMainMenu: "Close main menu",
      mainActions: "Main actions",
      menuNewExpense: "New expense",
      menuOptions: "Options",
      menuLogOut: "Log out",
      closeExpenseForm: "Close expense form",
    },
    analyticsPage: {
      trendTitle: "Trend by month",
      trendSubtitle:
        "Compare spending volume between the current month and the previous five.",
      categoryTitle: "Category weight",
      categorySubtitle:
        "See at a glance where the active month spending is concentrated.",
      insightsTitle: "Key indicators",
      insightsSubtitle:
        "Quick summary to understand the month without duplicating the budget block.",
      budgetTitle: "Budget tracking",
      budgetSubtitle:
        "Check which categories are on target and which ones need adjustment.",
    },
    expenseForm: {
      title: "Title",
      titlePlaceholder: "Ex. Internet, gym, groceries...",
      amount: "Amount",
      category: "Category",
      date: "Date",
      note: "Note",
      notePlaceholder: "Optional: expense context or reminder",
      cancel: "Cancel",
      newSubmit: "Add expense",
    },
    filters: {
      search: "Search transactions",
      searchPlaceholder: "Search by title or note",
      category: "Category",
      allCategories: "All categories",
      sortBy: "Sort by",
      mostRecent: "Most recent date",
      oldest: "Oldest date",
      highestAmount: "Highest amount",
      lowestAmount: "Lowest amount",
      clear: "Clear filters",
    },
    expenseList: {
      emptyTitle: "No visible expenses",
      emptyDescription:
        "There are no expenses for this filter. Add one or adjust the search to see results.",
      edit: "Edit",
      delete: "Delete",
    },
    budgetAlerts: {
      warningTitle: "Budget almost exhausted",
      dangerTitle: "You are overspending",
      warningEyebrow: "Attention",
      dangerEyebrow: "Priority alert",
      warningSubtitle:
        "{{count}} categories have already consumed almost their full monthly budget.",
      dangerSubtitle:
        "You have exceeded {{amount}} across {{count}} categories this month.",
      spentBudget: "Spent: {{spent}} / Budget: {{budget}}",
      used: "{{value}}% used",
    },
    budgetStatus: {
      emptyTitle: "No budget tracking yet",
      emptyDescription:
        "Set budgets to get alerts and comparisons by category.",
      overBudget: "Budget exceeded",
      remaining: "Remaining margin",
    },
    charts: {
      insufficientHistoryTitle: "Not enough history",
      insufficientHistoryDescription:
        "There is not enough data yet to compare the trend across months.",
      noCategoryBreakdownTitle: "No category breakdown",
      noCategoryBreakdownDescription:
        "Once you log expenses this month, you will see how they are distributed by category here.",
      monthTotal: "Month total",
      ofTotal: "{{value}}% of total",
    },
    monthSelector: {
      emptyTitle: "No available months",
      emptyDescription:
        "There are no months with transactions yet. Add your first expense to get started.",
      availableMonths: "Available months",
    },
    summary: {
      emptyTitle: "No monthly summary",
      emptyDescription:
        "Once you add expenses, you will see the total, average, and leading category for the month here.",
      monthlyTotal: "Monthly total",
      averagePerExpense: "Average per expense",
      movementCount: "Transaction count",
      dominantCategory: "Top category",
      monthBudget: "Monthly budget",
      noData: "No data",
    },
    insights: {
      emptyTitle: "No indicators available",
      emptyDescription:
        "There are no transactions this month yet. Add expenses to unlock comparisons and indicators.",
      totalMonth: "Month total",
      variationVsPrevious: "Change vs previous month",
      movementCount: "Number of expenses",
      topCategory: "Top category",
      averagePerMovement: "Average per movement",
      noReference: "No reference",
      noDominantCategory: "No dominant category",
      registeredThisMonth: "{{count}} expenses recorded this month",
      remainingBudget: "{{amount}} left in budget",
      noBudget: "No budget defined for comparison",
    },
    warningThreshold: {
      label: "Warning threshold",
    },
    collapsible: {
      collapse: "Collapse {{title}}",
      expand: "Expand {{title}}",
    },
  },
};

export function getLanguageLocale(language) {
  return language === "en" ? "en-IE" : "es-ES";
}

export function getCategoryLabel(categoryId, language = "es") {
  return (
    CATEGORY_LABELS[categoryId]?.[language] ??
    CATEGORY_LABELS[categoryId]?.es ??
    categoryId
  );
}

export function translate(language, key, variables = {}) {
  const dictionary = translations[language] ?? translations.es;
  const fallback = translations.es;
  const value =
    key.split(".").reduce((result, segment) => result?.[segment], dictionary) ??
    key.split(".").reduce((result, segment) => result?.[segment], fallback);

  if (typeof value !== "string") {
    return key;
  }

  return value.replace(/\{\{(\w+)\}\}/g, (_, token) => {
    return variables[token] ?? "";
  });
}
