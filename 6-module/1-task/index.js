/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

//своих знаний не хватило, увы

/*export default class UserTable {
  constructor(rows) {
    this.data = rows;

  }

  makeTable() {
    const table = document.createElement('TABLE');
    const thead = document.createElement('THEAD');
    const tbody = document.createElement('TBODY');

    thead.innerHTML = `<tr><th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th></tr>`;

    for (let user of this.data) {
      let tr = document.createElement('tr');

      let td1 = document.createElement('td');
      td1.innerHTML = user.name;
      tr.appendChild(td1);

      let td2 = document.createElement('td');
      td2.innerHTML = user.age;
      tr.appendChild(td2);

      let td3 = document.createElement('td');
      td3.innerHTML = user.salary;
      tr.appendChild(td3);

      let td4 = document.createElement('td');
      td4.innerHTML = user.city;
      tr.appendChild(td4);

      let btn = document.createElement('button');
      btn.innerHTML = 'X';
      let td5 = document.createElement('td');
      td5.appendChild(btn);
      tr.appendChild(td5);


      tbody.appendChild(tr);

    }

    table.innerHTML = `${thead.innerHTML}${tbody.innerHTML}`;

    table.addEventListener('click', function (event) {
    event.target.closest('tr').remove()

  });



return table;
};

get elem() {
  return this.makeTable();
}
}*/
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    this.elem.innerHTML = `
      <thead>
          <tr>
            <td>Имя</td>
            <td>Возраст</td>
            <td>Зарплата</td>
            <td>Город</td>
            <td></td>
          </tr>
      </thead>
    `;

    let tableInner = rows.map(row => {
      let cellsWithData = Object.values(row) // для каждого значения из объекта row
        .map(value => `<td>${value}</td>`) // обернуть его в <td>
        .join(''); // полученный массив <td>...</td> объединить в одну строку

      return `
          <tr>
            ${cellsWithData}
            <td><button>X</button></td>
          </tr>
        `; // возвращаем верстку одной строки
    }).join('');

    this.elem.innerHTML += `
      <tbody>
        ${tableInner}
      <tbody>
    `; // оборачиваем полученные строчки в tbody

    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onClick(event) {
    if (event.target.tagName != 'BUTTON') {
      return;
    }

    let tr = event.target.closest('tr');

    tr.remove();
  }

}
