# Yandex traveller API
Сортировщик карточек путешественника

<p>Я долго думал какого именно формата API нужно, поэтому есть версия node и обычная <code>&lt;script&gt;</code> версия </p>

<h1>Устновка</h1>
<h3>Версия Node</h3>
<p>Чтобы установить этот модуль выполните <code>npm i zennka --save</code></p>
<a href="https://www.npmjs.com/~zennka"/>Мой профиль NPM</a>


<h3>&lt;script&gt; версия</h3>
<p>чтобы использовать модуль через тег <code>&lt;script&gt;</code>, найдите файл <code>traveler.js</code> в директории <code>node-free-version</code> 
и подколючите к странице </p>

<h1>API</h1>
<em>ПРИМЕЧАНИЕ: при подключении через тег функции описанные ниже вызываются у переменной <code>travelerAPI</code>, которя появляется в контексте видимости</em>
<p>
  <code>findWay(cardArray)</code> - принимает массив карточек путешественника, и возвращает массив 
  со словестным описанием отсортированного массива<br/>
  <code>addTransportType(transportType, options)</code> - добавляет новый вид транспорта
</p>

<h4><code>findWay(cardArray)</code></h4>
  <p><code>cardArray</code> - массив объектов типа:
  <pre>
  {
      to: точка отправления
      from: точка прибытия
      transport: описание транспорта
  }
  </pre>
  <em>Пример:</em>
  <pre>
  {
      from: 'Los Santos',
      to: 'Las Ventures',
      transport: {
          type: 'JetPack',
          cheatcode: 'ROCKETMAN'
      }
  }</pre>
  </p>
  
  <h4><code>addTransportType(transportType, options)</code></h4>
  <p>
    <code>transportType</code> - строка с названием транспорта<br/>
    <code>options</code> - Объект задающий описание движения на тм или ином транспорте, имеет вид:
      <pre>
      {
          template: '' - строка с описанием. Для корректной работы должна включать в себя фигурные скобки {{}}, в которых должно быть заключено
          название объекта (будут подставлены значения)
          addition: необязательные данные, котрые буду приседенены только при наличии указанного в {{}} ключа
      }
      </pre>
      <em>Пример:</em>
      <pre>
      {
        template : "Use Jet Pack to get to {{to}} from {{from}}.",
        addition: "You can use cheatcode {{cheatcode}}"
      }
      </pre>
  </p>
