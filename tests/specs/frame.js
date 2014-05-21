describe('frame', function () {
	describe('Has modulesData object', function () {
		it('should have modulesData', function () {
			expect(frame.modulesData).toEqual(jasmine.any(Object));
		});
	});

	describe('Have register method', function () {
		it('frame should have register() method', function () {
			expect(frame.register).toEqual(jasmine.any(Function));
		});

		it('register() should accept 2 arguments', function () {
			spyOn(frame, 'register');
			frame.register('moduleName', {});
			expect(frame.register).toHaveBeenCalledWith('moduleName', {});
		});

		it('register() should accept string as first and Object as second argument', function () {
			spyOn(frame, 'register');
			frame.register('moduleName', {});
			expect(frame.register).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Object));
		});
	});

	describe('frame has startAll() method', function () {
		it('frame should have startAll() method', function () {
			expect(frame.startAll).toEqual(jasmine.any(Function));
		});

		it('startAll() should accept 1 argument as Object', function () {
			var obj = {};
			spyOn(frame, 'startAll');
			frame.startAll(obj);
			expect(frame.startAll).toHaveBeenCalledWith(obj);
		});
	});

	describe('Method for _isMethod() function', function () {
		it('frame should have _isMethod() function', function () {
			expect(frame._isMethod).toEqual(jasmine.any(Function));
		});

		it('_isMethod should accept 1 argument', function () {
			spyOn(frame, '_isMethod');
			frame._isMethod('callback');
			expect(frame._isMethod).toHaveBeenCalledWith('callback');
		});
	});
});
