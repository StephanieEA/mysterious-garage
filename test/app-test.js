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

  it('should have a method called loadItems', function(){
    chai.assert.isFunction(storage.loadItems);
  });

  it('should have a method called renderItemCounts', function(){
    chai.assert.isFunction(storage.renderItemCounts);
  });

  it('should have a method called addItem', function(){
    chai.assert.isFunction(storage.addItem);
  });

  it('should have a method called updateItem', function(){
    chai.assert.isFunction(storage.updateItem);
  });

  it('should have a method called renderItem', function(){
    chai.assert.isFunction(storage.renderItem);
  });

  it('should have a method called renderCleanlinessSelection', function(){
    chai.assert.isFunction(storage.renderCleanlinessSelection);
  });

  it('should have a method called formatCleanliness', function(){
    chai.assert.isFunction(storage.formatCleanliness);
  });

  it('formatCleanliness should return a cleanliness object with an updated true value', function(){
    chai.assert.deepEqual(storage.formatCleanliness('Sparkling'), {
      Sparkling: true,
      Dusty: false,
      Rancid: false
    });
    chai.assert.deepEqual(storage.formatCleanliness('Dusty'), {
      Sparkling: false,
      Dusty: true,
      Rancid: false
    });
    chai.assert.deepEqual(storage.formatCleanliness('Rancid'), {
      Sparkling: false,
      Dusty: false,
      Rancid: true
    });
  });

  it('should have a method called searchByName', function(){
    chai.assert.isFunction(storage.searchByName);
  });

  it('searchByName should return matches between its arguments with search values', function(){
    const all = [{
      id: '1',
      name: 'xylophone',
      reason: 'Future mixed media project',
      cleanliness: {Sparkling: true, Dusty: false, Rancid: false}}, {
      id: '2',
      name: 'crayons',
      reason: 'Cool pattern',
      cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
    }]
    const e = {target: {value: 'crayons'}}

    chai.assert.equal(storage.searchByName(e, all).length, 1)
    chai.assert.equal(storage.searchByName(e, all)[0].name, 'crayons')
  });

  it('searchByName should return matches between its arguments without search values', function(){
    const all = [{
      id: '1',
      name: 'xylophone',
      reason: 'Future mixed media project',
      cleanliness: {Sparkling: true, Dusty: false, Rancid: false}}, {
      id: '2',
      name: 'crayons',
      reason: 'Cool pattern',
      cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
    }]
    const empty = {target: {value: ''}}

    chai.assert.equal(storage.searchByName(empty, all).length, 2)
  });

  it('should have a method called sortAscendingAlphabetically', function(){
    chai.assert.isFunction(storage.sortAscendingAlphabetically);
  })

  it('sortAscendingAlphabetically should return its argument array with all objects in name alphabetization', function () {
    const all = [{
      id: '1',
      name: 'xylophone',
      reason: 'Future mixed media project',
      cleanliness: {Sparkling: true, Dusty: false, Rancid: false}}, {
      id: '2',
      name: 'crayons',
      reason: 'Cool pattern',
      cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
    }];

      chai.assert.equal(storage.sortAscendingAlphabetically(all)[0].name, 'crayons')
      chai.assert.equal(storage.sortAscendingAlphabetically(all)[1].name, 'xylophone')
    })

  it('should have a method called sortDescendingAlphabetically', function(){
    chai.assert.isFunction(storage.sortDescendingAlphabetically);
  });


  it('sortDescendingAlphabetically should return its argument array with all objects in reverse name alphabetization', function () {
    const all = [{
      id: '1',
      name: 'aardvark',
      reason: 'Future mixed media project',
      cleanliness: {Sparkling: true, Dusty: false, Rancid: false}}, {
      id: '2',
      name: 'Zebra Curtains',
      reason: 'Cool pattern',
      cleanliness: {Sparkling: false, Dusty: true, Rancid: false}
    }];

      chai.assert.equal(storage.sortDescendingAlphabetically(all)[0].name, 'Zebra Curtains')
      chai.assert.equal(storage.sortDescendingAlphabetically(all)[1].name, 'aardvark')
    })
})
