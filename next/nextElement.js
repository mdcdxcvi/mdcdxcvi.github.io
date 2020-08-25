export default class NextElement {
    id;
    content;
    positiveVotes;
    negativeVotes;
    
    constructor(id, content) {
        this.id = id;
        this.content = content;
        this.positiveVotes = 0;
        this.negativeVotes = 0;
    }

    getVotes() {
        return this.positiveVotes - this.negativeVotes;
    }

    getHtml() {
        return `
        <div class="columns is-vcentered">
            <div class="column is-2 is-offset-2">
                <div class="buttons has-addons">
                    <button onclick="deleteElement(${this.id})" class="button">
                        <span class="icon has-text-danger">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                    <button onclick="voteDown(${this.id})" class="button">
                        <span class="icon">
                            <i class="fas fa-angle-down"></i>
                        <span>
                    </button>
                    <button onclick="voteUp(${this.id})" class="button">
                        <span class="icon has-text-success">
                            <i class="fas fa-angle-up"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="column is-1">
                <span class="tag">${this.getVotes() > 0 ? '+' : ''}${this.getVotes()}</span>
            </div>
            <div class="column">${this.content}</div>
        </div>
        `
    }
}
