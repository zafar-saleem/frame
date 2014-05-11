describe('CORE', function () {
	describe('Has modulesData object', function () {
		it('should have modulesData', function () {
			expect(CORE.modulesData).toEqual(jasmine.any(Object));
		});
	});

	describe('Have register method', function () {
		it('CORE should have register() method', function () {
			expect(CORE.register).toEqual(jasmine.any(Function));
		});

		it('register() should accept 2 arguments', function () {
			spyOn(CORE, 'register');
			CORE.register('moduleName', {});
			expect(CORE.register).toHaveBeenCalledWith('moduleName', {});
		});

		it('register() should accept string as first and Object as second argument', function () {
			spyOn(CORE, 'register');
			CORE.register('moduleName', {});
			expect(CORE.register).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
		});
	});

	describe('CORE has startAll() method', function () {
		it('CORE should have startAll() method', function () {
			expect(CORE.startAll).toEqual(jasmine.any(Function));
		});

		it('startAll() should accept 1 argument as Object', function () {
			var obj = {};
			spyOn(CORE, 'startAll');
			CORE.startAll(obj);
			expect(CORE.startAll).toHaveBeenCalledWith(obj);
		});
	});

	describe('Method for _isMethod() function', function () {
		it('CORE should have _isMethod() function', function () {
			expect(CORE._isMethod).toEqual(jasmine.any(Function));
		});

		it('_isMethod should accept 1 argument', function () {
			spyOn(CORE, '_isMethod');
			CORE._isMethod('callback');
			expect(CORE._isMethod).toHaveBeenCalledWith('callback');
		});
	});
});
