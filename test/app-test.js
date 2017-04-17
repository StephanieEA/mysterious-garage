describe('Storage', function() {
  const storage = new Storage
  it('is an Object', function(){
    chai.assert.isObject(storage);
  });

  it('should have a property of garageDoor', function(){
    chai.assert.isObject(storage.garageDoor);
  });

  it('should have a property of garage', function(){
    chai.assert.isObject(storage.garage);
  });

  it('should have a property of nameInput', function(){
    chai.assert.isObject(storage.nameInput);
  });

  it('should have a property of reasonInput', function(){
    chai.assert.isObject(storage.reasonInput);
  });

  it('should have a property of cleanlinessInput', function(){
    chai.assert.isObject(storage.cleanlinessInput);
  });

  it('should have a property of submitItemButton', function(){
    chai.assert.isObject(storage.submitItemButton);
  });

  it('should have a property of showItems', function(){
    chai.assert.isObject(storage.showItems);
  });

  it('should have a property of count', function(){
    chai.assert.isObject(storage.count);
  });

  it('should have a property of search', function(){
    chai.assert.isObject(storage.search);
  });

  it('should have a property of sortButon', function(){
    chai.assert.isObject(storage.sortButon);
  });

  it('should have a property of toggleSort initialized as false', function(){
    chai.assert.isFalse(storage.toggleSort);
  });

  it('should have a property of all initialized as null', function(){
    chai.assert.isNull(storage.all);
  });

})
