# React Complete Guide

Demo sites

- Expense: https://ianchen0419.github.io/react-complete-guide/expense/index.html
- Couse Goal: https://ianchen0419.github.io/react-complete-guide/course-goal/index.html
- User Age: https://ianchen0419.github.io/react-complete-guide/user-age/index.html
- Login Panel: https://ianchen0419.github.io/react-complete-guide/login-panel/index.html

## Archived Projects

- Expense - https://github.com/ianchen0419/react-complete-guide/tree/expense
- Couse Goal - https://github.com/ianchen0419/react-complete-guide/tree/course-goal
- User Age - https://github.com/ianchen0419/react-complete-guide/tree/user-age
- Login Panel - https://github.com/ianchen0419/react-complete-guide/tree/login-panel

## Airbnb ESLint Rules

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

### Side Effects

Side Effects 是相對於 Main Jobs 的概念，React 的 Main Job 是處理畫面渲染、表單互動，Side Effects 則是指這以外的事情，諸如 HTTP Request, setTimeout

Side Effects 的處理過程會在 React 的元件渲染流程外面，所以 React 元件通常捕捉不到 Side Effects，因此要使用`useEffect()`特別處理 Side Effects

`userEffect()`的第一個參數是一個 callback 函數，如果條件通過的話，就會執行這個 callback（這個 callback 裡面可以放 Side Effects 相關的程式），第二個參數是陣列，裡面描述了條件

在這段程式中，使用`setIsLoggedIn`控制使用者是否登入，如果已登入的話會換成主頁面，未登入的話是登入頁。但是因為這頁如果登入到了主頁面，直接 Refresh 會回到未登入的狀態，造成使用體驗差，所以另外使用了`localStorage`暫存登入的狀態，避免重複的登入

```js:App.js
function App() {
  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (storedUserLoggedInInformation === 1) {
    setIsLoggedIn(true);
  }
}
```

但是這段程式有個問題，假如今天有人真的是已登入，然後又重新刷新網頁，那麼`isLoggedIn`會先被設定為`false`，接著在由於有`localStorage`的關係在被設定為`true`，造成無謂的浪費

可以利用`userEffect()`改寫，將判斷`localStorage`是否存在這段移動到`useEffect()`之中

- `useEffect()`會發生在 Component Evaluation 之後，也就是說他會被最後執行
- 只有在指定的 dependency（`userEffect()`的第二個參數）成立，才會執行`userEffect()`的 callback

在這個範例中，由於 dependency 為空，所以 callback 只會執行一次而已

```diff js:App.js
function App() {
- const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

-  if (storedUserLoggedInInformation === '1') {
-    setIsLoggedIn(true);
-  }

+  useEffect(() => {
+    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
+
+    if (storedUserLoggedInInformation === '1') {
+      setIsLoggedIn(true);
+    }
+  }, []);
}

```

`useEffect()`也可以用來簡化重複的程式，下面的程式，`setFormIsValid`重複了很多次，我們可以統一放在`useEffect()`裡面，這次由於 dependecy 指定了`[enteredEmail, enteredPassword]`，表示這段`useEffect()`在`enteredEmail`或是`enteredPassword`變更的時候會再執行一次。

```diff js:Login.js
function Login() {

+  useEffect(() => {
+    setFormIsValid(
+      enteredEmail.includes('@') && enteredPassword.trim().length > 6,
+    );
+  }, [enteredEmail, enteredPassword]);

  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);

-    setFormIsValid(
-      event.target.value.includes('@') && enteredPassword.trim().length > 6,
-    );
  }

  function passwordChangeHandler(event) {
    setEnteredPassword(event.target.value);

-    setFormIsValid(
-      event.target.value.trim().length > 6 && enteredEmail.includes('@'),
-    );
  }
}
```

### useEffect Cleanup

上個範例的 Login.js 當中的`useEffect()`存在一個問題，每當使用者輸入輸入框，只要他輸入一個字，就會觸發 useEffect，如果這隻程式有發送 HTTP Reuqest，那麼他會造成不必要的浪費

其中一個解法是`setTimeout()`

```diff js:Login.js
useEffect(() => {
+  setTimeout(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6,
    );
+  }, 500);
}, [enteredEmail, enteredPassword]);
```

useEffect()的第一個參數 callback，裡面可以呼叫 return，但是 return 必須接一個函數，他稱為 Cleanup function。他可以做 Cleanup process，在前面的 useEffect 完成之後，新的 useEffect 執行之前，執行 cleanup funcion

所以流程會是這樣

1. 使用者輸入輸入框
2. 執行 setFormIsValid
3. 休息 10 秒
4. 使用者再次輸入輸入框
5. **執行 Cleanup proccess**
6. 執行 setFormIsValid

由於`setTimeout()`對於連續的執行會有點 buggy，所以我們可以在 Cleanup proccess 清除舊的`setTimeout()`

```diff js:Login.js
useEffect(() => {
-  setTimeout(() => {
+  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6,
    );
  }, 500);

+  return () => {
+    clearInterval(identifier);
+  };
}, [enteredEmail, enteredPassword]);
```

結果：Cleanup function 依然會執行超多次，但是 useEffect 被`setTimeout()`包起來的那段只會每隔 0.5 秒執行一次

如果`useEffect()`的 dependency 什麼都不加的話，那這個 useEffect 會在每次 Component 運作前都運行，所以他會運行很多次，這顆元件會這樣：

1. 進入畫面，元件開始動作
2. 印出`Effect running`
3. 元件執行 render
4. 使用者操作輸入框，觸發元件機制
5. 印出`Effect running`
6. 元件完成輸入框 Reactive 機制

```js:Login.js
function Login() {
  useEffect(() => {
    console.log('Effect running');
  });
}
```

### useReducer

這段程式中的`setFormIsValid()`不好，因為由於 React 執行 State Update 順序的關係，他執行的時候，可能不會抓到最新的`enteredPassword`。所以這邊適合用`useReducer`代替`useState`，適合使用`useReducer`的情境如下：

- 處理兩個關係密切的`useState`（例如`enteredEmail`, `emailIsValid`）
- 兩個`useState`互相具有依賴關係

Reducer 的概念：定義一個 State，但是這個 State 的內容是由另一個 State 所決定

```js:Login.js
function Login() {
  function emailChangeHandler(event) {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6,
    );
  }
}
```

`useReducer`的語法

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

這個範例中，可以看到`emailIsValid`的值是被`enteredEmail`決定，這兩個 state 具備依賴關係。`emailReducer`可以完全放在外面，因為這個函示不需要任何元件內的東西。

```diff js:Login.js
- import React, { useState } from 'react';
+ import React, { useState, useReducer } from 'react';

+function emailReducer(state, action) {
+  if (action.type === 'USER_INPUT') {
+    return { value: action.val, isValid: action.val.includes('@') };
+  }

+  if (action.type === 'INPUT_BLUR') {
+    return { value: state.value, isValid: state.value.includes('@') };
+  }

+  return { value: '', isValid: false };
+}

function Login() {
-  const [enteredEmail, setEnteredEmail] = useState('');
-  const [emailIsValid, setEmailIsValid] = useState();

+  const [emailState, dispatchEmail] = useReducer(emailReducer, {
+    value: '',
+    isValid: null,
+  });

  function emailChangeHandler(event) {
-    setEnteredEmail(event.target.value);
     // 在原本做變更的地方改用dispatch
+    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });


    setFormIsValid(
-      event.target.value.includes('@') && enteredPassword.trim().length > 6,
+      emailState.value.includes('@') && enteredPassword.trim().length > 6,
    );
  }

  function validateEmailHandler() {
-    setEmailIsValid(enteredEmail.includes('@'));
+    dispatchEmail({ type: 'INPUT_BLUR' });
  }
}

```

### Context API

從下面這 3 個範例可以看出，他一層一層傳遞`isLoggedIn`這個狀態，總共跨了 3 層，如果專案非常複雜，這樣做會不好管理，而且這種傳遞方式只適用在子孫關係，兄弟關係的元件就不適用

```js:App.js
return <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />;
```

```js:MainHeader.js
return <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />;
```

```js:Navigation.js
return (
  <nav className={classes.nav}>
    <ul>
      {props.isLoggedIn && (
        <li>
          <a href="/">Users</a>
        </li>
      )}
      {props.isLoggedIn && (
        <li>
          <a href="/">Admin</a>
        </li>
      )}
      {props.isLoggedIn && (
        <li>
          <button type="button" onClick={props.onLogout}>
            Logout
          </button>
        </li>
      )}
    </ul>
  </nav>
);
```

Context 可以無視階層關係，做出一個所有元件都可以 access 的資料層，儲存 State 狀態

首先在`src`底下建立新資料夾：`context`（或可以命名為`store`或是`state`），然後在`context`底下新增`auth-context.js`（之所以不命名為`AuthContext.js`是因為 Camel Case 會代表元件，但這隻只是用來存資料）

```js:src/context/auth-context.js
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
```

然後在需要監聽的元件上使用，用法是把目標元件包進`<AuthContext.Provider></AuthoContext.Provider>`裡面

```diff js:App.js
return (
-  <>
+   <AuthContext.Provider>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
+   </AuthContext.Provider>
-  </>
);
```

因為包了`<AuthContext.Provider>`，所以裡頭的元件，跟元件的小孩們，現在都可以存取到

Context 的監聽有兩種：Context Consumer 跟 useContext Hook（通常使用 React Hook 居多）

### Context Consumer

將目標元件包覆在`<AuthContext.Consumer>`底下，並且寫好 Consumer Child（需要是一個函式），Consumer Child 的第一個參數`ctx`，會指向定義好的 AuthContext 內容

```diff js:Navigation.js
return (
+  <AuthContext.Consumer>
+   {(ctx) => {
+
+   }}
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button type="button" onClick={props.onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
+ </AuthContext.Consumer>
);
```

然後，因為 Consumer Child 需要回傳這個元件的內容，所以把原本元件的 jsx 搬到 Consumer Child 裡面去，並且把`props.isLoggedIn`都改成`ctx.props.isLoggedIn`

```diff js:Navigation.js
return (
  <AuthContext.Consumer>
    {(ctx) => (
      <nav className={classes.nav}>
        <ul>
-         {props.isLoggedIn && (
+         {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
-         {props.isLoggedIn && (
+         {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
-         {props.isLoggedIn && (
+         {ctx.isLoggedIn && (
            <li>
              <button type="button" onClick={props.onLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    )}
  </AuthContext.Consumer>
);
```

最後，回到 App.js，設定 Provider 的初始值

```diff js:App.js
return (
-  <AuthContext.Provider>
+  <AuthContext.Provider value={{
+    isLoggedIn: isLoggedIn
+  }}>
)
```

然後可以把用不到的`props`都移掉，完成！

### useContext Hook

修改 Navigation.js，引入`useContext`，然後調用`useContext()`，並且存為`ctx`，然後用`ctx`取代`props`

```js:Navigation.js
import React, { useContext } from 'react';

function Navigation() {
  const ctx = useContext(AuthContext);
}
```

### Dynamic Context

可以取代`props.onLogout`的方法

首先，先把舊的`props.onLogout`刪除

```diff js:App.js
return (
-  <MainHeader onLogout={logoutHandler} />
+  <MainHeader />
)
```

```diff js:MainHeader.js
return (
-  <Navigation onLogout={props.onLogout} />
+  <Navigation />
)
```

然後，擴增`AuthContext Provider`的初始設定

```diff js:App.js
return (
  <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
+   onLogout: logoutHandler,
  }}>
)
```

這樣設定好後，所有監聽`AuthContext`的元件，都可以拿到`ctx.logoutHandler`這個函式了

基本上資料的傳遞都是優先選擇用`props`，除非遇到一個資料要傳給很多元件，或者是要傳資料給某特殊元件（例如：Navigation）

## Context 優化

備註：雖然這樣設定就完成了 Dynamic Context，但是因為平常在使用的時候，如果輸入`ctx`，出現的 autocomplete 候選清單裡面不會有`onLogout`，所以為了提升使用體驗，我們可以在`auth-context.js`加上`onLogout`，只需要填入空 function 就可以了

```diff js:auth-context.js
const AuthContext = React.createContext({
  isLoggedIn: false,
+ onLogout: () => {}
});
```

另外，也可以將 AuthContext.Provider 搬進去 auth-context.js 裡面，這樣就不用把邏輯寫在 App.js。首先將 auth-context.js 加入 AuthContextProvider 部分

```js:auth-context.js
export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  function loginHandler() {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  }

  const defaultContextValue = useMemo({
    isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  });

  return (
    <AuthContext.Provider value={defaultContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
```

然後移除 App.js 的邏輯部分、<AuthContext>部分

接著，打開 index.js，修改這段

```diff js:index.js
-root.render(
  <React.StrictMode>
+   <AuthContextProvider>
      <App />
+   </AuthContextProvider>
  </React.StrictMode>,
);
```

最後，在 App.js 加入`useContext()`

```js:App.js
function App() {
  const ctx = useContext(AuthContext);
}
```

### Context 的限制

如果將 Context 使用在 UI 元件上（例如：`Button.js`），然後定義了`onClick={logoutHandler}`事件，那麼這個元件的 click 就只能提供 logoutHandler，沒辦法做其他用途。所以當寫 UI 元件時，應該使用`props`而不是 Context

另外，Context 如果應用在需要頻繁存取的狀況，也是不適合（可能會很慢）

### Hooks

像是`useState`、`useEffect`這種 use 開頭的叫做 hook，hooks 的使用規則有：

要用 hooks 要放在 React Function 內，React Function 有：

- React Component Function
- Custom Hooks

另外，Hooks 只能放在 React Function 的第一層裡，不能放在 block statements 裡面，也不能放在 nested function 裡面

最後，當使用`useEffect()`的時候，可以將 useEffect 裡頭用到的所有變數等等，加進去 dependency

### Forward Refs (useRef)

可以呼叫 Components 裡面的函式

例如，在 Login.js 的 submitHandler，多加一個判斷，確認所有的輸入框是否通過驗證，如果通過，就執行 onLogin，但是如果不通過，要 focus 第一個輸入框，如果是原生的`<input />`可以直接執行`focus()`，但是由於我們的`<Input/>`是一個元件，所以必須自己做這個`focus()`

改寫 Input.js：

1. 引入`useRef`，並且定義`active()`
2. 在 JSX 把`ref`串起來
3. Function Component 新增第二個參數：`ref`，引入`useImperativeHandle`並且使用它
4. 將整個 Function Component 用`React.forwardRef`包起來

```js:Input.js
import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

function Input(props, ref) {
  const inputRef = useRef();

  function activate() {
    inputRef.current.focus();
  }

  useImperativeHandle(ref, () => ({
    focus: activate,
  }));

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}

export default React.forwardRef(Input);
```

再來，改寫 Login.js

```js:Login.js
function Login() {
  function submitHandler(event) {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  }

  return (
    <Input
      ref={emailInputRef}
      id="email"
      label="E-Mail"
      type="email"
      isValid={emailIsValid}
      value={emailState.value}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
    />
  )
}
```

### Props Spreading

原本的寫法是這樣

```js
/**
 * Input Component
 *
 * @example
 * const inputProps = {
 *  label: 'Name',
 *  input: {
 *    id: 'k1',
 *    type: 'text',
 *  }
 * }
 * return (
 *  <Input type={props.input.type} id={props.input.id} />
 * )
 */
function Input(props) {
  return (
    <>
      <label>{props.label}</label>
      <input type={props.input.type} id={props.input.id} />
    </>
  );
}
```

可以透過 Spread Syntax [簡寫成這樣

```js
function Input(props) {
  return (
    <>
      <label>{props.label}</label>
      <input {...props.input} />
    </>
  );
}
```
