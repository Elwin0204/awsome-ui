import { createTest, destroyVM } from '../util';
import Row from 'packages/row';

describe('Row', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Row, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('aw-row')).to.be.true;
  });
  it('gutter', () => {
    vm = createTest(Row, {
      gutter: 20
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.style.marginLeft).to.be.equal('-10px');
    expect(rowElm.style.marginRight).to.be.equal('-10px');
  });
});
