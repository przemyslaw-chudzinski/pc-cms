const loaderAsync = {

    $loader: $('.loader-async'),

    config : {
        title: 'Loading...',
        subtitle: ''
    },

    show(userConfig = {}) {
        let config = Object.assign({}, this.config, userConfig);
        this.$loader.find('.loader-async-title').text(config.title);
        this.$loader.find('.loader-async-subtitle').text(config.subtitle);
        this.$loader.addClass('visible');
    },

    hide() {
        setTimeout(() => this.$loader.removeClass('visible'), 1000);
    }

};

export default loaderAsync;
