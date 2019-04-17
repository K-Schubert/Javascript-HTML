// Functions
function add(accumulator, a) {
    return accumulator + a;
}

function checkValue(cues) {
    var index = cues > 0;
    return index;
}

function checkZero(cues) {
    return cues == 0;
}

function generate_cues(cues){
    for (i=0; i<attributes.length; i++){
        cues.car_A[i] = Math.round(Math.random());
        cues.car_B[i] = Math.round(Math.random());
    }

    let ind = Math.floor(Math.random()*(cues.car_A.length - 1))
    cues.car_A[ind] = 1;
    cues.car_B[ind] = 0;
    cues.car_A[ind+1] = 0;
    cues.car_B[ind+1] = 1;

    return cues.car_A, cues.car_B
}

function ev(cues, probas){
    for (i=0; i<probas.length; i++){
        exp_A[i] = cues.car_A[i] * probas[i];
        exp_B[i] = cues.car_B[i] * probas[i];
    }
    exp_A = exp_A.reduce(add);
    exp_B = exp_B.reduce(add);
    return exp_A, exp_B;
}

function make_symbols(cues){
    var symbols = JSON.parse(JSON.stringify(cues))
    for (i=0; i<symbols.car_A.length; i++){
        if (symbols.car_A[i] == 0){
            symbols.car_A[i] = "-";
        } else {
            symbols.car_A[i] = "*";
        }
        if (symbols.car_B[i] == 0){
            symbols.car_B[i] = "-";
        } else {
            symbols.car_B[i] = "*";
        }
    }
    return symbols
}



// Random image pair generator
var carList = ["carA", "carB", "carC", "carD", "carE", "carF", "carG", "carH", "carI", "carJ"];
var ind_carA = Math.floor(Math.random()*carList.length);
var ind_carB = Math.floor(Math.random()*carList.length);

while (ind_carB == ind_carA) {
    ind_carB = Math.floor(Math.random()*carList.length);
}

var path_carA = "images/" + carList[ind_carA] + ".png";
var path_carB = "images/" + carList[ind_carB] + ".png";


// Experimental setup
var attributes = ["Price", "Mileage", "Initial Registration Date", "Seat heating"];
var probas = [0.9, 0.8, 0.7, 0.6]; // sequence of length attributes




var prediction = Math.random() > 0.5;
var dealer_reco = Math.random() > 0.5;

console.log("Predictions are the same: ", prediction)
console.log("Is there a dealer reco?: ", dealer_reco)

// prediction false :strategies make different predictions
// prediction true: strategies make same predictions
// dealer_reco false: no dealer recommendation
// dealer_reco true: dealer recommendation


switch(prediction){
    case false:

        // DIFFERENT PREDICTION CHOICE
        var cues = {car_A: [], car_B: []};
        var choice_exp = 0;
        var choice_best = 0;

        // Table generation for different choice strategy
        while (exp_A == exp_B | choice_exp == choice_best) {

            cues.car_A, cues.car_B = generate_cues(cues);

            var exp_A = [];
            var exp_B = [];
            exp_A, exp_B = ev(cues, probas);

            // Expected value strategy
            if (exp_A > exp_B){
                choice_exp = "car_A";
                not_choice_exp = "car_B";
            } else {
                choice_exp = "car_B";
                not_choice_exp = "car_A";
            }

            let possible_ind = [];
            for (i=0; i<attributes.length; i++){
                if (cues[choice_exp][i] > cues[not_choice_exp][i]){
                    possible_ind.push(i);
                }
            }
            let select = Math.floor(Math.random()*possible_ind.length);
            var attribute_exp = attributes[possible_ind[select]];

            // Best cue strategy
            for (i=0; i<attributes.length; i++){
                if (cues.car_A[i] == cues.car_B[i]){
                    continue;
                }
                if (cues.car_A[i] > cues.car_B[i]){
                    choice_best = "car_A";
                } else {
                    choice_best = "car_B";
                }
                var k = i;
                break;
            }
        }

        switch(dealer_reco){
            case false:
                if (Math.random() > 0.5){
                    var redirect = 'choice.html';
                    var pred_reco_attribute = 0;
                    var condition = "Condition 7";
					var reco_attribute = attributes[k];
                    console.log("Condition 7")
                } else {
                    var redirect = 'choice.html';
					var reco_attribute = attribute_exp;
                    var pred_reco_attribute = 0;
                    var condition = "Condition 8";
                    console.log("Condition 8")
                }
            break;

            case true:

                if (Math.random() > 0.5){
                    // Best cue recommendation
                    var recommendation = "Have you considered the " + attributes[k] + " ?";
                    var pred_reco_attribute = choice_best;
					var reco_attribute = attributes[k];
                    var redirect = 'stimulus.html';
                    var condition = "Condition 3";
                    console.log("Condition 3")
                } else {
                    // EV recommendation
                    var recommendation = "Have you considered the " + attribute_exp + " ?";
                    var pred_reco_attribute = choice_exp;
					var reco_attribute = attribute_exp;
                    var redirect = 'stimulus.html';
                    var condition = "Condition 4";
                    console.log("Condition 4")
                }

            break;
        }

    break;

    case true:

        // SAME PREDICTION CHOICE
        var cues = {car_A: [], car_B: []};
        var choice_exp = 0;
        var choice_best = 0;
        var not_choice_best = 0;

        // Table generation for different choice strategy
        while (exp_A == exp_B | choice_exp != choice_best) {

            cues.car_A, cues.car_B = generate_cues(cues);

            var exp_A = [];
            var exp_B = [];
            exp_A, exp_B = ev(cues, probas);

            // Expected value strategy
            if (exp_A > exp_B){
                choice_exp = "car_A";
            } else {
                choice_exp = "car_B";
            }

            // Best cue strategy
            for (i=0; i<attributes.length; i++){
                if (cues.car_A[i] == cues.car_B[i]){
                    continue;
                }
                if (cues.car_A[i] > cues.car_B[i]){
                    choice_best = "car_A";
                    not_choice_best = "car_B";
                } else {
                    choice_best = "car_B";
                    not_choice_best = "car_A";
                }
                var k = i;
                break;
            }
        }

        for (i=0; i<attributes.length; i++){
            if (cues[not_choice_best][i] > cues[choice_best][i]){
                var attribute_not_choice_best = attributes[i];
                break;
            }
        }

        switch(dealer_reco){
            case false:
                if (Math.random() > 0.5){
                    var condition = "Condition 5";
					var reco_attribute = attributes[k];
                    console.log("Condition 5")
                    var pred_reco_attribute = 0;
                    var redirect = 'choice.html';
                } else {
                    var condition = "Condition 6";
                    console.log("Condition 6")
					
					var reco_attribute = attribute_not_choice_best;
                    var pred_reco_attribute = 0;
                    var redirect = 'choice.html';
                }
            break;

            case true:

                if (Math.random() > 0.5){
                    var recommendation = "Have you considered the " + attributes[k] + " ?";
                    var reco_attribute = attributes[k];
					var pred_reco_attribute = choice_best;
                    var redirect = 'stimulus.html';
                    var condition = "Condition 1";
                    console.log("Condition 1")
                } else {
                    var recommendation = "Have you considered the " + attribute_not_choice_best + " ?";
                    var pred_reco_attribute = not_choice_best;
					var reco_attribute = attribute_not_choice_best;
                    var redirect = 'stimulus.html';
                    var condition = "Condition 2";
                    console.log("Condition 2")
                }

            break;
    break;
    }
}

symbols = make_symbols(cues);
