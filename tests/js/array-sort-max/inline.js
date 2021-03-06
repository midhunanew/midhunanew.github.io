/**
 * Created by mithoos on 16/1/16.
 */
/* jshint strict:false */
/* globals console */
var performance = window.performance;

/*
 function getBy() {
 return;
 }
 */

function getByForLoop(array) {
    var max = -Infinity,
        a = array.length,
        counter;

    for (counter = 0; counter < a; counter++) {
        if (array[counter] > max) {
            max = array[counter];
        }
    }
    return max;
}

function findBiggestNumber(num) {
    var counts = [], results = [], method = [], time = [];
    var i;
    for (i = 0; i < num; i++) {
        counts.push(i*2+i);
    }

    var a, b;

    a = performance.now();
    var biggest = -Infinity, counter, total = counts.length;
    for (counter = 0; counter < total; counter++) {
        if (counts[counter] > biggest) {
            biggest = counts[counter];
        }
    }
    b = performance.now();
    time.push(b - a);
    method.push("Simple For loop");

    a = performance.now();
    results.push(getByForLoop(counts));
    b = performance.now();
    time.push(b - a);
    method.push("getByForLoop");

    /*
     // Hit error!
     a = performance.now();
     results.push(Math.max.apply(Math, counts));
     b = performance.now();
     time.push(b - a);
     method.push("getByApply");
     */

    a = performance.now();
    var largest = -Infinity;
    var dump = counts.filter(function (v) {
        if (v > largest) {
            largest = v;
        }
    });
    results.push(largest);
    b = performance.now();
    time.push(b - a);
    method.push("getByFilter");

    a = performance.now();
    results.push(counts.reduce(function (highest, count) {
        return Math.max(highest, count);
    }, 0));
    b = performance.now();
    time.push(b - a);
    method.push("getByReduce");


    a = performance.now();
    results.push(counts.sort(function (a, b) {
        return b - a;
    })[0]);
    b = performance.now();
    time.push(b - a);
    method.push("getBySort");

    a = performance.now();
    results.push(counts.reduce(function (highest, count) {
        return Math.max(highest, count);
    }, 0));
    b = performance.now();
    time.push(b - a);
    method.push("getByReduceMax");

    //console.log(biggest);
    //console.log(results.join('\n'));

    var mapped = time.map(function(el, i) {
        return { index: i, value: el };
    });


// sorting the mapped array containing the reduced values
    mapped.sort(function(a, b) {
        return +(a.value > b.value) || +(a.value === b.value) - 1;
    });


// container for the resulting order
    var result = mapped.map(function(el){
        return method[el.index] + ' >> ' + time[el.index];
    });
    console.log('INLINE');
    console.log(result.join('\n'));

    return null;

}

findBiggestNumber(1E6);