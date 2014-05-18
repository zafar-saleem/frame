FRAME.register('Todo', {

	events: {
        'click #btn-add' : 'addItem',
        'click .delete'  : 'deleteItem',
        'click .update'  : 'setUpdates',
        'click #update'  : 'updateItem'
    },

    init: function () {
        this.$textfield = $('.item');
        this.$items     = $('#items');
        this.$button    = $('.button');
        this.counter    = 1;
        this.itemId     = null;
    },

    addItem: function () {
        var item = this.$textfield.val();
        if (!item) return;

        this.$items.prepend(FRAME.createElement('li', {
            children: [
                FRAME.createElement('span', { id: 'item-' + this.counter, text: item }),
                FRAME.createElement('a', { 'class': 'delete', text: 'Delete', href: '#' }),
                FRAME.createElement('a', { 'class': 'update', text: 'Update', href: '#' })
            ]
        }));

        this.counter++;
        this._emptyTextfield();
        this.$textfield.focus();
    },

    deleteItem: function (e) {
        e.preventDefault();
        $(e.target).parent().remove();
    },

    setUpdates: function (e) {
        e.preventDefault();
        var $span = $(e.target).parent().children('span');

        this.itemId = $span.attr('id');
        this.$textfield.val($span.text());
        this.$textfield.focus();
        this.$button.text('Update').attr('id', 'update').removeClass('btn-success').addClass('btn-primary');
    },

    updateItem: function () {
        var item  = this.$textfield.val();
        var $span = this.$items.find('#' + this.itemId);
        $span.text(item);
        this._emptyTextfield();
        this.$textfield.focus();
        this.$button.text('Add').attr('id', 'add').removeClass('btn-primary').addClass('btn-success');
    },

    _emptyTextfield: function () {
        this.$textfield.val('');
    }
});

FRAME.startAll();
