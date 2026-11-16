// Pruebas del motor (sin dependencias): node test.js
const fs=require('fs'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/server.js','utf8');
const createEngine=new Function(src.slice(src.indexOf('function createEngine'),src.indexOf('//#ENGINE-END'))+';return createEngine')();
let k=0;const E=createEngine(()=>'id'+ ++k),H=(p,b)=>E.api('POST',p,{},b||{},true);
const a=E.api('POST','/join',{},{name:'Ana'}),b=E.api('POST','/join',{},{name:'ana'});
assert.equal(a[0],200);assert.notEqual(a[1].name.toLowerCase(),b[1].name.toLowerCase(),'nombres únicos');
assert.equal(E.api('POST','/join',{},{name:'<b>x​</b>'})[1].name,'bx/b','limpia <> y caracteres invisibles');
assert.equal(E.api('POST','/draw',{},{},false)[0],403,'sorteo exige clave');
H('/config',{places:2});
let n=0;while(H('/draw')[0]===200&&n<60)n++;
const s=E.snap();assert.ok(s.over,'la partida termina');assert.ok(new Set(s.called).size===s.called.length,'sin repetidos');
assert.ok(s.win.length&&s.win[0].place===1);
H('/reset');assert.equal(E.snap().called.length,0);assert.equal(E.snap().round,2);
console.log('OK: todas las pruebas pasaron');
