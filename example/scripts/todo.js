// Todo example that shows usage of FRAME framework
FRAME.register('Todo', {
    // FRAME events system in practice
	events: {
        'click #btn-add' : 'addItem',
        'click .delete'  : 'deleteItem',
        'click .update'  : 'setUpdates',
        'click #update'  : 'updateItem'
    },
    
    // init/constructor that initializes
    init: function () {
        this.counter = 1;
        this.itemId  = null;
    },

    // Method that adds item in the list
    addItem: function () {
        var item = this.$input.val();
        if (!item) return;

        this.$ul.prepend(this.createElement('li', {
            children: [
                this.createElement('span', { id: 'item-' + this.counter, text: item }),
                this.createElement('a', { 'class': 'delete', text: 'Delete', href: '#' }),
                this.createElement('a', { 'class': 'update', text: 'Update', href: '#' })
            ]
        }));

        this.counter++;
        this._emptyTextfield();
        this.$input.focus();
    },

    // delete item from the list
    deleteItem: function (e) {
        e.preventDefault();
        $(e.target).parent().remove();
        this.$input.focus();
    },

    // sets up item needs to be updated
    setUpdates: function (e) {
        e.preventDefault();
        var $span = $(e.target).parent().children('span');

        this.itemId = $span.attr('id');
        this.$input.val($span.text());
        this.$input.focus();
        this.$button.text('Update').attr('id', 'update').removeClass('btn-success').addClass('btn-primary');
    },

    // updates item in the list with the new value
    updateItem: function () {
        var item  = this.$input.val();
        var $span = this.$ul.find('#' + this.itemId);
        $span.text(item);
        this._emptyTextfield();
        this.$input.focus();
        this.$button.text('Add').attr('id', 'btn-add').removeClass('btn-primary').addClass('btn-success');
    },

    // empty textfield
    _emptyTextfield: function () {
        this.$input.val('');
    }
});

FRAME.startAll();
