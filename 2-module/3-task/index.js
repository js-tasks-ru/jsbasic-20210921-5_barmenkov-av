let calculator = {
  read: function(a,b) {
    this.digitA = a;
    this.digitB = b;
  },
  sum: function() {
    return this.digitA + this.digitB;
  },
  mul: function() {
    return this.digitA * this.digitB;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
