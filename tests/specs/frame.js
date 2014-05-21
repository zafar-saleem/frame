describe('FRAME', function () {
	describe('Has modulesData object', function () {
		it('should have modulesData', function () {
			expect(FRAME.modulesData).toEqual(jasmine.any(Object));
		});
	});

	describe('Have register method', function () {
		it('FRAME should have register() method', function () {
			expect(FRAME.register).toEqual(jasmine.any(Function));
		});

		it('register() should accept 2 arguments', function () {
			spyOn(FRAME, 'register');
			FRAME.register('moduleName', {});
			expect(FRAME.register).toHaveBeenCalledWith('moduleName', {});
		});

		it('register() should accept string as first and Object as second argument', function () {
			spyOn(FRAME, 'register');
			FRAME.register('moduleName', {});
			expect(FRAME.register).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
		});
	});

	describe('FRAME has startAll() method', function () {
		it('FRAME should have startAll() method', function () {
			expect(FRAME.startAll).toEqual(jasmine.any(Function));
		});

		it('startAll() should accept 1 argument as Object', function () {
			var obj = {};
			spyOn(FRAME, 'startAll');
			FRAME.startAll(obj);
			expect(FRAME.startAll).toHaveBeenCalledWith(obj);
		});
	});

	describe('Method for _isMethod() function', function () {
		it('FRAME should have _isMethod() function', function () {
			expect(FRAME._isMethod).toEqual(jasmine.any(Function));
		});

		it('_isMethod should accept 1 argument', function () {
			spyOn(FRAME, '_isMethod');
			FRAME._isMethod('callback');
			expect(FRAME._isMethod).toHaveBeenCalledWith('callback');
		});
	});
});
