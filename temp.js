export function reverseInterpret(text) {
    var asciiKeys = new Array(text.length);
    for (var i = 0; i < text.length; i ++)
        asciiKeys[i] = text[i].charCodeAt(0);
    return IntListToBF(asciiKeys);
}

function IntListToBF(intListIn) {
    n = FindBaseInteger(intListIn);
    var coeffList = new Array([]);
    for (var m = 0; m < intListIn.length; m++) {
        for (var c = 0; c < Math.ceil(m / n); c++ ) {
            coeffList[m][c] = (c+1) + Math.abs(intListIn[m] - ((c+1) * n))
        }
    }
    var updatedCoeffList = new Array();
    for (var m = 0; m < coeffList.length; m++) {
        var min = 0;
        for (var n = 1; n < coeffList[m].length; n++) {
            if (coeffList[m][n] < coeffList[m][min]) {
                min = n;
            }
        }
        updatedCoeffList.push(coeffList[m][n]+1);
    }
    var diffList = new Array(intListIn.length);
    for (var m = 0; m < intListIn.length; m++) {
        diffList[i] = intListIn[i] - n * updatedCoeffList[i];
    }
    return BFGenerator(diffList, n, updatedCoeffList)
}

function FindBaseInteger(intListIn) {
    var A = new Array([]);
    var max = Math.max.apply(null, this);
    for (var m = 1; m < max; m++) {
        var row = new Array();
        for (var n = m; n < max - m; n = n+m+1 ) {
            row.push(n);
        }
        A.push(row);
    }
    var B = new Array([]);
    var i = 0;
    for (var n = 0; n < intListIn.length; n++) {
        var j = 0;
        for (var col = 0; col < A.length; col++) {
            var k = 0;
            for (var elem = 0; elem < A[col].length; elem++) {
                B[i][j] = k + Math.abs(intListIn[n].map( function(value) { return value - A[col][elem];}););
                k++;
            }
            j++;   
        }
        i++;
    }
    
    var updatedB = new Array([]);
    for (var matrix = 0; matrix < B.length; matrix++) {
        var min = 0;
        for (var col = 1; col < B[matrix].length; col++) {
            if (B[matrix][col] < B[matrix][min]) {
                min = n;
            }
        }
        updatedCoeffList.push(B[m][n]+1);
    }

    B = [[min(col) for col in matrix] for matrix in B] #Select the most efficient coefficient for each letter for each basis integer
    B = [sum([B[j][i] for j in range(len(B))]) for i in range(len(B[0]))] #Sum the costs of every letter assuming the most efficient coefficient for each basis integer
    B = [B[i] + sum(GetDivisors(i + 1)) + 5 * len(GetDivisors(i + 1)) for i in range(len(B))] #Correct the weights for the length of the integer counter construct
    return B.index(min(B)) + 1 #Return the most efficient basis integer
}