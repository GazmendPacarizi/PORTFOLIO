 document.getElementById("hcircle_calculation").onclick = function () {
    let D1 = parseFloat(document.getElementById("hcircle_diam").value);
    D1 = Number(D1);

    let S1 = parseFloat(document.getElementById("hcircle_slope").value);
    S1 = Number(S1);

    let N1 = parseFloat(document.getElementById("hcircle_friction").value);
    N1 = Number(N1);


    let A1 = (Math.PI * D1 ** 2) / 4;
    //let Xr = X.toFixed(2); // vetem dy presje dhjetore 
    //console.log(X);

    let P1 = Math.PI * (D1 / 2); //PERIMETRI
    //console.log(P);

    let R1 = (A1 / P1); //RADIUSI
    //console.log(R);
    
    
    let v2 = ((1 / N1)) * (R1 **(2 / 3)) * Math.sqrt(S1 / 100);
    //console.log(v);
    
    let Q2 = v2 * A1;
    
    document.getElementById("hcircle_Area").innerHTML = "Area is: " + " " + A1.toFixed(2) + " " + "m2";
    document.getElementById("hcircle_Perimeter").innerHTML = "Perimeter is: " + " " + P1.toFixed(2) + " " + "m";
    document.getElementById("hcircle_Radius").innerHTML = "Radius is: " + " " + R1.toFixed(2) + " " + "m";
    document.getElementById("hcircle_velocity").innerHTML = "Velocity is: " + " " + v2.toFixed(2) + " " + "m/s";
    document.getElementById("hcircle_flow").innerHTML = "Flow is: " + " " + Q2.toFixed(2) + " " + "m3/s";
}

