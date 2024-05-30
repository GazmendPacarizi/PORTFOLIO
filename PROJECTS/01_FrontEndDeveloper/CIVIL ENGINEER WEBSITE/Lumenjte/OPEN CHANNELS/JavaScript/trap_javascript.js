 document.getElementById("trap_calculation").onclick = function () {
    let B = parseFloat(document.getElementById("trap_base").value);
    B = Number(B);

    let A = parseFloat(document.getElementById("trap_side").value);
    A = Number(A);

    let H = parseFloat(document.getElementById("trap_height").value);
    H = Number(H);

    let S = parseFloat(document.getElementById("trap_slope").value);
    S = Number(S);

    let F = parseFloat(document.getElementById("trap_friction").value);
    F = Number(F);


    let X = ((2 * B + 2 * A)/2) * H;
    //let Xr = X.toFixed(2); // vetem dy presje dhjetore 
    //console.log(X);

    let P = B + 2 * Math.sqrt(A**2 + H**2);
    //console.log(P);

    let R = (((2 * B + 2 * A)/2) * H) / (B + 2 * Math.sqrt(A**2 + H**2));
    //console.log(R);
    
    
    let v = ((1 / F)) * (R **(2 / 3)) * Math.sqrt(S / 100);
    //console.log(v);
    
    let Q = v * X;
    
    document.getElementById("trap_Area").innerHTML = "Sipërfaqja është: " + " " + X.toFixed(2) + " " + "m2";
    document.getElementById("trap_Perimeter").innerHTML = "Perimetri është: " + " " + P.toFixed(2) + " " + "m";
    document.getElementById("trap_Radius").innerHTML = "Rrezja hidraulike është: " + " " + R.toFixed(2) + " " + "m";
    document.getElementById("trap_velocity").innerHTML = "Shpejtësia është: " + " " + v.toFixed(2) + " " + "m/s";
    document.getElementById("trap_flow").innerHTML = "Prurja është: " + " " + Q.toFixed(2) + " " + "m3/s";
}

