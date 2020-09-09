export default class NextElement {
    id;
    content;
    done;
    positiveVotes;
    negativeVotes;
    
    constructor(id, content) {
        this.id = id;
        this.done = false;
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
                    <button ${this.done ? 'disabled' : ''} onclick="deleteElement(${this.id})" class="button">
                        <span class="icon has-text-danger">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                    <button ${this.done ? 'disabled' : ''} onclick="voteDown(${this.id})" class="button">
                        <span class="icon">
                            <i class="fas fa-angle-down"></i>
                        <span>
                    </button>
                    <button ${this.done ? 'disabled' : ''} onclick="voteUp(${this.id})" class="button">
                        <span class="icon has-text-success">
                            <i class="fas fa-angle-up"></i>
                        </span>
                    </button>
                    <button onclick="done(${this.id})" class="button">
                        <span class="icon has-text-link">
                            <i class="${this.done ? 'fas' : 'far'} fa-check-square"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="column is-1">
                <span class="tag">${this.getVotes() > 0 ? '+' : ''}${this.getVotes()}</span>
            </div>
            <div style="${this.done ? 'text-decoration: line-through;' : ''}" class="column"}>${this.content}</div>
        </div>
        `
    }
}
