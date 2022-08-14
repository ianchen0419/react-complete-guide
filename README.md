# React Complete Guide

Demo sites

- Expense: https://ianchen0419.github.io/react-complete-guide/expense/index.html
- Couse Goal: https://ianchen0419.github.io/react-complete-guide/course-goal/index.html

## Archived Projects

- Expense - https://github.com/ianchen0419/react-complete-guide/tree/expense
- Couse Goal - https://github.com/ianchen0419/react-complete-guide/tree/course-goal

## Airbnb ESLint Rules

https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules

## Learning Memo

### props

用於兩個元件之間傳遞資訊使用，比如 A 元件裡面有 B 元件

```js:A.js
import B from './B.js'

function A() {
  return <B title="hey" name="cool" />
}

```

```js:B.js
function B(props) {
  console.log(props); // {title: "hey", name: "cool"}

  return ...省略...
}

```

### Wrapper Components

一個 Component 裡面挖一個洞，可以填任何東西 inner
比方說 Card Component，裡面可以包東西。使用 Card 時要用這種方式`<Card>東西放這裡</Card>`

`props.children`是特別的名稱，雖然沒有指定，但是是指包在 Tag 裡面的東西

```js:Card.js
function Card(props) {
  const classes = 'card ' + props.className;
  return <div className={classes}>{props.children}</div>;
}
```

```js:A.js
function A() {
  function A() {
    return (
      <Card className="anotherClassOK">
        <h2>ALOHA!</h2>
      </Card>
    )
  }
}
```

### JSX

jsx 是一種語法，原本的用法是`React.createElement()`

例如，這是一段 jsx

```js
function App() {
  return (
    <div>
      <h2>Let&apos;s get start</h2>
      <Expenses items={expense} />
    </div>
  );
}
```

它翻譯成`React.createElement()`後會變這樣

```js
import React from 'react';

function App() {
  return React.createElement(
    'div',
    {},
    React.createElement('h2', {}, 'Let&apos;s get start'),
    React.createElement(Expenses, { items: expense }),
  );
}
```

### Arrow Function Syntax

傳統的 Function 長這樣

```js:App.js
function App() {
  return ...;
}
export default App;
```

寫成 Arrow Function 以後變這樣

```js:App.js
const App = () => {
  return ...;
}
export default App;
```

### useState

useState 是一個 hook

功能：當按鈕點擊後，改變標題的文字內容

```js
import React, { useState } from 'react';

function ExpenseItem(props) {
  const [title, setTitle] = userState(props.title); // useState必須放在Function的Direct Scope

  function clickHandler() {
    setTitle('Updated');
  }

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={clickHandler}></button>
    </div>
  );
}
```

### onChange 拿到 input 的 value

```js
function Form() {
  function changeHandler(event) {
    console.log(event.target.value);
  }

  return <input onChange={changeHandler} />;
}
```

### Multilple State and Single State

這是 Multiple State

```js
function Form() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function amountChangeHandler(event) {
    setEnteredAmount(event.target.value);
  }

  function dateChangeHandler(event) {
    setEnteredDate(event.target.date);
  }

  return (
    <form>
      <input onChange={titleChangeHandler}>
      <input onChange={amountChangeHandler}>
      <input onChange={dateChangeHandler}>
    </form>
  );
}
```

Single State

```js
function Form() {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  function titleChangeHandler(event) {
    setUserInput({
      ...userInput, // 必須要Copy剩下的，不然會遺失掉剩下的
      enteredTitle: event.target.value,
    });
  }

  function amountChangeHandler(event) {
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  }

  function dateChangeHandler(event) {
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  }

  return (
    <form>
      <input onChange={titleChangeHandler}>
      <input onChange={amountChangeHandler}>
      <input onChange={dateChangeHandler}>
    </form>
  );
}
```

### 更新 State 的方式

如果有一串 State，但是只需要更新其中一項，有兩種做法

第一種

```js
function Form() {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  function titleChangeHandler(event) {
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    });
  }

  return (
    <form>
      <input onChange={titleChangeHandler}>
      <input onChange={amountChangeHandler}>
      <input onChange={dateChangeHandler}>
    </form>
  );
}
```

第二種：第二種比較好，因為 prevState 拿到的資料比較即時

```diff js
function Form() {
  const [userInput, setUserInput] = useState({
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
  });

  function titleChangeHandler(event) {
+   setUserInput((prevState) => ({
+     ...prevState,
+     enteredTitle: event.target.value,
+   }));
  }

  return (
    <form>
      <input onChange={titleChangeHandler}>
      <input onChange={amountChangeHandler}>
      <input onChange={dateChangeHandler}>
    </form>
  );
}
```

### Two-way binding

首先先處理 useState，讓 input 每次 change 都可以抓到改變的值

```js
function Form() {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeHandler(event) {
    setEnteredTitle(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={}>
      <input type="text" onChange={changeHandler} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

接下來處理 two-way binding，當輸入完輸入資訊後，按下 Submit 按鈕，要清空輸入框的內容
two-way binding 的寫法是`value={enteredtitle}`

```diff js
function Form() {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeHandler(event) {
    setEnteredTitle(event.target.value)
  }

  function submitHandler(event) {
    event.preventDefault();
+   console.log(enteredTitle); // 拿到輸入的value
+   setEnteredTitle(''); // 清空value的state
  }

  return (
    <form onSubmit={}>
+     <input value={enteredTitle} type="text" onChange={changeHandler} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Child-to-Parent 的元件溝通

`<NewExpense />`裡面有`<ExpenseForm />`，當`<ExpenseForm />`的值更新後，要傳更新值給`<NewExpense />`

作法：設計自己的 Event Prop

NewExpense 部分（Parent Component）

```js:NewExpense.js
import ExpenseForm from './ExpenseForm';

function NewExpense() {
  function saveExpenseDataHandler(enteredExpenseData) {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
  }

  return <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
}

export default NewExpense;
```

ExpenseForm 部分（Child Component）

```diff js:ExpenseForm.js
+function ExpenseForm(props) {
  function submitHandler() {
    const expenseData = { title: "aloha" };
+   props.onSaveExpenseData(expenseData);
  }

  return (
    <form onSubmit={submitHandler}>
      <button type="submit"></button>
    </form>
  )
}

export default ExpenseForm
```

資料如果要跨元件傳遞，只能透過 Parent-to-Children 方式，如果是兩個鄰居元件要互傳，那要先鄰居 A→ 傳給 Parent（lifting the state up），再由 Parent→ 傳給鄰居 B

### Component 種類

#### Controll Component

定義：裡面有表單元件，會負責往上傳遞/接收資料
範例：ExpenseFilter

#### Presentational Component

或可稱為 Stateless Component、Dump Component
定義：沒有`useState`的元件

#### Stateful Component

或可稱為 Smart Component
定義：有使用到`useState`的元件
範例：ExpenseForm

### Dynamic List

資料流部分：初始資料 + 更新資料

首先定義初始資料

```js:App.js
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [ ...省略... ];

function App(
  function addExpenseHandler(expense) {
    console.log(expense); // 每當NewExpense底下的form有送出新資料，這裡就會收到新的expense
  }

  return (
    <NewExpense onAddExpense={addExpenseHandler} />
    <Expenses />
  );
);

export Default App();
```

再來用 useState 直接設定初始值，然後傳到到裡面的元件裡

```diff js:App.js
+import React, { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [ ...省略... ];

function App(
+ const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  function addExpenseHandler(expense) {
    console.log(expense); // 每當NewExpense底下的form有送出新資料，這裡就會收到新的expense
  }

  return (
    <NewExpense onAddExpense={addExpenseHandler} />
+   <Expenses items={expenses} />
  );
);

export Default App();
```

最後加上新資料，更新每次的 expenses

```diff js:App.js
import React, { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [ ...省略... ];

function App(
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  function addExpenseHandler(expense) {
-   console.log(expense); // 每當NewExpense底下的form有送出新資料，這裡就會收到新的expense
+   setExpenses([expense, ...expenses]);
  }

  return (
    <NewExpense onAddExpense={addExpenseHandler} />
    <Expenses items={expenses} />
  );
);

export Default App();
```

然後，因為`setExpenses`使用函式的方式呼叫比較好，所以再改成這樣

```diff App.js
function addExpenseHandler(expense) {
-   setExpenses([expense, ...expenses]);
+   setExpenses((prevExpenses) => [expense, ...prevExpenses]);
}
```

### Conditional Content

使用 ternary condition 來寫，可以用小括弧把 Content 包起來

```js
return {
  1 + 1 == 2 ?
  (<p>Hey</p>) :
  (<p>Woo</p>)
};
```

### And Operator

如果條件符合的話，會回傳`&&`後面的內容

```js
1 + 1 == 2 && console.log('y'); // y

1 + 1 == 3 && console.log('y'); // false
```

用 And Operator 簡化 Conditional Content

```js
return (
  { 1 + 1 === 2 && <p>Hey</p> }
  { 1 + 1 !== 2 && <p>Woo</p> }
)
```

### Dynamic Style

需求：做出長條圖，高度由 css 的`height`控制
JSX 的`style={{}}`的第外括號表示要填入 JS 變數，內括號表示一個物件

如果是填入`background-color`這種複合單字，有兩種記法

- 第一種 `<div style={{'background-color': 'red'}}></div>`
- 第二種 `<div style={{backgroundColor: 'red'}}></div>`

```js
unction ChartBar(props) {
  let barFillHeight = '0%';

  if (props.max > 0) {
    barFillHeight = Math.round((props.value / props.max) * 100) + '%';
  }

  return (
    ...
    <div className="chart-bar__fill" style={{height: barFillHeight}}></div>
    ...
  );
}
```

### Dynamic className

```jsx
<label className={`form-control ${!isValid ? 'invalid' : ''}`} htmlFor="goal">
  Course Goal
</label>
```

### Styled Components

#### Button 的用法（Tag selector）

創造出封裝的 CSS 環境，讓元件的 CSS 不會影響外部

使用方法：

首先，引入 styled-components，選用一個 HTML 元件
（例如選用`button`）
然後將 Button.css 的內容貼到``引號之中
並且把原本的 Function Component 刪掉

```js:Button.js
import styled from 'styled-components';

const Button = styled.button`
.button {
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;

  @media (min-width: 768px) {
    width: auto;
  }
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}
`;

// function Button(props) {
//   return (
//     <button
//       type={props.type === 'submit' ? 'submit' : 'button'}
//       className="button"
//       onClick={props.onClick}
//     >
//       {props.children}
//     </button>
//   );
// }

export default Button;
```

因為`styled.button`就是只 css 的 button selector 了，所以裡面改成 SCSS 風格的寫法

```diff js:Button.js
import styled from 'styled-components';

const Button = styled.button`
-.button {
  width: 100%;
  font: inherit;
  padding: 0.5rem 1.5rem;
  border: 1px solid #8b005d;
  color: white;
  background: #8b005d;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
  cursor: pointer;
-}

@media (min-width: 768px) {
  width: auto;
}

-.button:focus {
+&:focus {
  outline: none;
}

-.button:hover,
-.button:active {
+&:hover,
+&:active {
  background: #ac0e77;
  border-color: #ac0e77;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
}
`;
```

#### .form-control 的用法（Class Selector）

```js:CourseInput.js
import styled from 'styled-components';

const FormControl = styled.div`
  margin: 0.5rem 0;

  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => (props.invalid ? 'red' : 'black')};
  }
}
`

function CourseInput(props) {
  return (
    <form>
      <FormControl invalid={!isValid}>
        <label>Label</label>
        ...
      </FormControl
    </form>
  )
}

export default CourseInput
```

### CSS Modules

CSS Modules 一樣不會影響到 Global 環境，並且是 React 內建支援

首先，把`Button.css`改名為`Button.module.css`

然後，把引入 css 的地方改成這樣

```diff js:Button.js
-import './Button.module.css';
+import styles from './Button.module.css';
```

接下來，把 JSX 的`className`調整成這樣

```diff js:Button.js
-return <button className="button"></button>
+return <button className={styles.button}></button>
```

Button.module.css 內容大概是這樣

```css:Button.module.css
.button {
  font: inherit;
  ...
}

.button:focus {
  outline: none;
}

.button:hover,
.button:active {
  background: #ac0e77;
  ...
}

```

CSS Module 會把對象的 CSS 檔案裡面的 class 作為物件，因為檔案使用了`.button`，所以在 JSX 要寫成`className={styles.button}`

#### CSS Module dynamic style

當 css 有涉入條件判斷時的寫法

```css:CourseInput.module.css
.form-control {
  margin: 0.5rem 0;
}

...省略...

.form-control.invalid label {
  color: red;
}
```

```js:CourseInput.js
import styles from './CourseInput.module.css';

function CourseInput(props) {
  return (
    <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
      <label htmlFor="goal">Course Goal</label>
    </div>
  )
}

export default CourseInput;
```

## Custom Element and CSS Module

原生的 HTML Tag（像是`<button>`、`<div>`），React 都會幫忙處理好 CSS Module
但是自製的 Custom Element（像是`<Card/>`），React 不會幫忙做 CSS Module，所以要額外處理

Card 元件：需要引入自己的 CSS（`card.module.css`），也要幫忙看他給其他元件用的時候被加上什麼 className（使用`props.className`處理）

```js:Card.js
import classes from './card.module.css';

function Card(props) {
  return (
    <div className={`${classes.card} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card;
```

AddUser 元件（引用 Card 元件）

```js:AddUser
import classes from './AddUser.module.css';

function AddUser() {
  <Card className={classes.input}>
    <input type="text" />
  </Card>
}

export default AddUser;
```

搭配的`AddUser.module.css`

```css:AddUser.module.css
.input {
  margin: 2rem auto;
}
```

## JSX Root Element

JSX 只能允許一個 root element，所以這樣的程式碼是錯的

```js
return (
   <h2>Hi</h2>
   <p>Good</p>
   { !isGood && <p>Are you OK?</p>}
);
```

解法(1)：使用另一個 root element 包覆

```js
return (
  <div>
    <h2>Hi</h2>
    <p>Good</p>
    {!isGood && <p>Are you OK?</p>}
  </div>
);
```

解法(2)：改成 Array 格式（）

- 要記得加上逗號`,`
- 每個 Item Element 要加上`key`
- 條件是內容不用使用大括號`{}`包覆

```js
return [
  <h2 key="heading">Hi</h2>,
  <p key="content">Good</p>,
  !isGood && <p>Are you OK?</p>,
];
```

解法(3)：使用 Wrapper.js
（用法跟用`<div>`包差不多，但是可以解決 div soup 的問題）

```js:Wrapper.js
function Wrapper(props) {
  return props.children;
}

export default Wrapper;
```

```js
import Wrapper from './Wrapper.js';

return (
  <Wrapper>
    <h2>Hi</h2>
    <p>Good</p>
    {!isGood && <p>Are you OK?</p>}
  </Wrapper>
);
```

解法(4)：使用 React.Fragment

```js
return (
  <React.Fragment>
    <h2>Hi</h2>
    <p>Good</p>
    {!isGood && <p>Are you OK?</p>}
  </React.Fragment>
);
```

或也可寫成這樣

```js
return (
  <>
    <h2>Hi</h2>
    <p>Good</p>
    {!isGood && <p>Are you OK?</p>}
  </>
);
```

也可寫成這樣

```js
import React, { useState, Fragment } from 'react';

return (
  <Fragment>
    <h2>Hi</h2>
    <p>Good</p>
    {!isGood && <p>Are you OK?</p>}
  </Fragment>
);
```

### React Portals

在這個範例中，`Modal`被放進去`Form`元件內，這不太合適，因為`Modal`是 overlay 類型的元件，他適合被放在最外層（body 的 direct children），而不是被塞入元件內

```js:Form.js
return (
  <>
    <Modal>
    <p>content</p>
  </>
)
```

利用 React Protals，可以將 overlay 類型的元件放到最外層

首先，修改 public/index.html

```diff html:public/index.html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
+ <div id="backdrop -root"></div>
+ <div id="overlay-root"></div>
  <div id="root"></div>
</body>
```

然後，修改 ErrorModal.js，建立另一個 Function Component
`Backdrop`，並且把原本藏在 ErrorModal 裡面的 backgrop 的 jsx 移出去

```diff js:src/components/UI/ErrorModal.js

+function Backdrop(props) {
+ return <div className={classes.backdrop} onClick={props.onConfirm} role="presentation"></div>
+}

function ErrorModal(props) {
  return (
   <>
-     <div
-       className={classes.backdrop}
-       onClick={props.onConfirm}
-       role="presentation"
-     ></div>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
   </>
  );
}
```

接著，建立 ModalOverlay，並且把 Modal 部分移進去

```diff js:src/components/UI/ErrorModal.js
function Backdrop(props) {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onConfirm}
      role="presentation"
    ></div>
  );
}

+function ModalOverlay(props) {
+  <Card className={classes.modal}>
+      <header className={classes.header}>
+        <h2>{props.title}</h2>
+      </header>
+      <div className={classes.content}>
+        <p>{props.message}</p>
+      </div>
+      <footer className={classes.actions}>
+        <Button onClick={props.onConfirm}>Okay</Button>
+      </footer>
+    </Card>
+}

function ErrorModal(props) {
  return (
    <>
-    <Card className={classes.modal}>
-      <header className={classes.header}>
-        <h2>{props.title}</h2>
-      </header>
-      <div className={classes.content}>
-        <p>{props.message}</p>
-      </div>
-      <footer className={classes.actions}>
-        <Button onClick={props.onConfirm}>Okay</Button>
-      </footer>
-    </Card>
  </>
  );
}
```

然後，引入 ReactDOM，並且在原本的 ErrorModal 內容裡面，使用`ReactDOM.createPortal()`

`ReactDOM.createPortal()`的第一個參數是要渲染的 ReactNode，第二個參數是指向實際的 Real DOM

```diff js:src/components/UI/ErrorModal.js
+import ReactDOM from 'react-dom';

...省略...

function ErrorModal(props) {
  return (
    <>
+      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
    </>
  )
}
```

最後，把`ModalOverlay`寫進去，要幫忙傳遞原本的`props.title`、`props.message`、`props.onConfirm`參數

```diff js:src/components/UI/ErrorModal.js
...省略...

function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
+      {ReactDOM.createPortal(
+        <ModalOverlay
+          title={props.title}
+          message={props.message}
+          onConfirm={props.onConfirm}
+        />,
+        document.getElementById('overlay-root'),
      )}
    </>
  )
}
```

### React Refs

可以使用 Refs 直接獲取 DOM

首先，引入 `useRef`

```diff js:src/components/Users/AddUser.js
-import React, { useState } from 'react';
+import React, { useState, useRef } from 'react';

```

然後在 Function Component 底下使用`useRef()`

```diff js:src/components/Users/AddUser.js
function AddUser(props) {
+  const nameInputRef = useRef();
+  const ageInputRef = useRef();
}
```

接著，對目標的 ReactNode 使用`ref`指向定義好的`useRef()`

```diff js:src/components/Users/AddUser.js
function AddUSer(props) {
  ...省略...

  return (
    <>
+     <input id="username" ref={nameInputRef}>
+     <input id="age" ref={ageInputRef}>
    </>
  )
}
```

這樣就完成了，可以在`addUserHandler()`裡面`console.log`看看

```js:src/components/Users/AddUser.js
function AddUSer(props) {
  ...省略...

  function addUserHandler(event) {
    console.log(nameInputRef, ageInputRef);
  }
}

```

可以使用`nameInputRef.current.value`抓到現在的值，並且將`enteredUsername`代換掉

```diff js:src/components/Users/AddUser.js
function AddUSer(props) {
  function addUserHandler(event) {
+    const nameRefValue = nameInputRef.current.value
+    const ageRefValue = ageInputRef.current.value

-    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
+    if (nameRefValue.trim().length === 0 || ageRefValue.trim().length === 0) {
      ...省略
    }

-    if (+enteredAge < 1) {
+    if (+ageRefValue < 1) {
      ...省略
    }

-    props.onAddUser(enteredUsername, enteredAge);
+    props.onAddUser(nameInputRef, ageRefValue);
  }
}
```

也可以用 Refs 的方式完成 Reset 邏輯

```diff js:src/components/Users/AddUser.js
function AddUser(props) {
-  const [enteredUsername, setEnteredUsername] = useState('');
-  const [enteredAge, setEnteredAge] = useState('');

  ...省略

  function addUserHandler(event) {
    ...省略
-    setEnteredUsername('');
-    setEnteredAge('');


+    nameInputRef.current.value = '';
+    ageInputRef.current.value = '';
  }

-  function usernameChangeHandler(event) {
-    setEnteredUsername(event.target.value);
-  }

-  function ageChangeHandler(event) {
-    setEnteredAge(event.target.value);
-  }

  return (
    <>
      <input
-       onChange={usernameChangeHandler}
-       value={enteredUsername}
        id="username"
        type="text"
        ref={nameInputRef}
      />
      <input
-       onChange={ageChangeHandler}
-       value={enteredAge}
        id="age"
        type="number"
        ref={ageInputRef}
      />
    </>
  )
}
```

當`<input />`搭配`ref`使用，他就會變成 Uncontrolled Component，他的行為不是被 React 控制住
