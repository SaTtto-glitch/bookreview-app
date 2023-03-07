/// <reference types="cypress" />

// Welcome to Cypress!
//
// この仕様ファイルには、Cypress でテストを作成する能力を実証するように設計された、
// todo リスト アプリ用のさまざまなサンプル テストが含まれています。
// 詳細については、次の入門ガイドをお読みください。
// https://on.cypress.io/introduction-to-cypress

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypressは各テストを白紙の状態で開始するため、
    // `cy.visit()` コマンドを使用して Web サイトにアクセスするように指示する必要があります。
    // すべてのテストの開始時に同じ URL にアクセスしたいので、
    // 各テストの前に実行されるように beforeEach 関数に含めます。
    cy.visit("https://example.cypress.io/todo");
  });

  it("displays two todo items by default", () => {
    // `cy.get()` コマンドを使用して、セレクターに一致するすべての要素を取得します。
    // 次に、'should' を使用して、2 つの既定のアイテムである
    // 2 つの一致するアイテムがあることをアサートします。
    cy.get(".todo-list li").should("have.length", 2);

    // さらに進んで、デフォルトの todo にそれぞれ正しいテキストが含まれていることを確認できます。
    // `last` 関数を使用して、最初と最後に一致した要素だけを個別に取得し、
    // should` でアサーションを実行します。
    cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
    cy.get(".todo-list li").last().should("have.text", "Walk the dog");
  });

  it("can add new todo items", () => {
    // アイテムのテキストを変数に保存して、再利用できるようにします
    const newItem = "Feed the cat";

    // 入力要素を取得し、`type` コマンドを使用して
    // 新しいリスト項目を入力します。アイテムの内容を入力した後、
    // 入力を送信するには、Enter キーも入力する必要があります。
    // この入力には data-test 属性があるため、それを使用してベスト プラクティスに従って要素を選択します。
    // https://on.cypress.io/selecting-elements
    cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);

    // 新しい項目を入力したので、実際にリストに追加されたことを確認しましょう。
    // これは最新の項目であるため、リストの最後の要素として存在する必要があります。
    // さらに、2 つのデフォルト項目があるため、リストには合計 3 つの要素が必要です。
    // アサーションはアサートされた要素を生成するため、
    // これら両方のアサーションを 1 つのステートメントにまとめることができます。
    cy.get(".todo-list li").should("have.length", 3).last().should("have.text", newItem);
  });

  it("can check off an item as completed", () => {
    // `get` コマンドを使用してセレクターで要素を取得することに加えて、
    // `contains` コマンドを使用して、その内容によって要素を取得することもできます。
    // ただし、これにより、テキストを含む最下位の要素である <label> が生成されます。
    // アイテムをチェックするために、この <label> の <input> 要素を見つけます
    // 親要素まで dom をトラバースします。そこから、子チェックボックスの <input> 要素を「見つけ」、「check」コマンドを使用してチェックできます。
    cy.contains("Pay electric bill").parent().find("input[type=checkbox]").check();

    // ボタンをチェックしたので、次に進み、リスト要素が完了としてマークされていることを確認します。
    // ここでも `contains` を使用して <label> 要素を見つけてから、`parents` コマンドを使用して、対応する <li> 要素が見つかるまで dom の複数のレベルをトラバースします。
    // その要素を取得したら、完全なクラスがあるとアサートできます。
    cy.contains("Pay electric bill").parents("li").should("have.class", "completed");
  });

  context("with a checked task", () => {
    beforeEach(() => {
      // 上記で使用したコマンドを使用して要素をチェックします
      // チェックから始まる複数のテストを実行したいので
      // 1 つの要素、beforeEach フックに入れます
      // すべてのテストの開始時に実行されるようにします。
      cy.contains("Pay electric bill").parent().find("input[type=checkbox]").check();
    });

    it("can filter for uncompleted tasks", () => {
      // 未完了の項目のみを表示するために「アクティブ」ボタンをクリックします
      cy.contains("Active").click();

      // フィルタリング後、リストに不完全な項目が 1 つだけあると断言できます。
      cy.get(".todo-list li").should("have.length", 1).first().should("have.text", "Walk the dog");

      // 念のため、チェックしたタスクがページに存在しないこともアサートしましょう。
      cy.contains("Pay electric bill").should("not.exist");
    });

    it("can filter for completed tasks", () => {
      // 上記のテストと同様の手順を実行して、完了したタスクのみが表示されるようにすることができます
      cy.contains("Completed").click();

      cy.get(".todo-list li").should("have.length", 1).first().should("have.text", "Pay electric bill");

      cy.contains("Walk the dog").should("not.exist");
    });

    it("can delete all completed tasks", () => {
      // まず、「Clear completed」ボタンをクリックしましょう `contains` は、実際にはここで 2 つの目的を果たしています。
       // まず、ボタンが dom 内に存在することを確認します。
       // このボタンは、少なくとも 1 つのタスクがチェックされている場合にのみ表示されるため、このコマンドはそのタスクが存在することを暗黙的に確認しています。
       // 次に、クリックできるようにボタンを選択します。
      cy.contains("Clear completed").click();

      // 次に、リストに要素が 1 つしかなく、要素が存在しないことを確認できます
      cy.get(".todo-list li").should("have.length", 1).should("not.have.text", "Pay electric bill");

      // 最後に、クリア ボタンが存在しないことを確認します。
      cy.contains("Clear completed").should("not.exist");
    });
  });
});
