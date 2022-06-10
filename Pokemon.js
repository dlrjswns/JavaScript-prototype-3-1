var createPokemon = function(name, type) { // 타입마다 다른 포켓몬을 생성해야하므로 팩토리패턴을 이용해주었다
    if(type == '물') {
        return new WaterPokemon(name)
    }
    else if(type == '불') {
        return new FirePokemon(name);
    }
    else if(type == '풀') {
        return new GrassPokemon(name);
    }
    else if(type == '전기') {
        return new ElectricPokemon(name);
    }
}

var Pokemon = function(name) {
    this.name = name;
    this.type = '무속성';
    this.skill = ['삐지기', '도망가기', '지침', '잠자기']; // 타입을 가지고있지않은 포켓몬을 생성할 경우 아무런 능력을 가지지못합니다
    this.wear = function() {
        console.log('저희 피팅샵에 오신것을 환영합니다 :)');
    }
}

// 포켓몬에 옷을 입힐 수 있고 원하는 스타일로 디자인할 수 있게끔 Decorator패턴을 이용해보았습니다
var 드레스 = function(포켓몬) {
    포켓몬.wear();
    포켓몬.wear = function() {
        console.log(포켓몬.name + '가 드레스를 입습니다.');
    }
  }

  var 니트 = function(포켓몬) {
    포켓몬.wear();
    포켓몬.wear = function() {
        console.log(포켓몬.name + '가 니트를 입습니다.');
    }
  }

  var 운동화 = function(포켓몬) {
    포켓몬.wear();
    포켓몬.wear = function() {
        console.log(포켓몬.name + '가 운동화를 신습니다.');
    }
  }

Pokemon.prototype.who = function() {
    console.log(this.name + '는 ' + this.type + '타입이고 [' + this.skill + '] 스킬을 사용할 수 있습니다.');
}

Pokemon.prototype.포켓볼에서나오다 = function() {
    console.log(this.name + '가 포켓볼에서 나왔습니다.');
}

Pokemon.prototype.포켓볼에들어가다 = function() {
    console.log(this.name + '가 포켓볼에 들어갔습니다.');
}

// 포켓몬은 스킬을 여러개 보유하고 있으므로 prototype을 Array 생성자 함수의 prototype을 참조하게 한다.
// PokemonSkill.prototype = Object.create(Array.prototype);

var ElectricPokemon = function(name) {
    Pokemon.call(this); // 부모인 Pokemon을 불러 초기화시켜준다
    this.name = name;
    this.skill = ['백만볼트', '번개후리기', '전광석화', '천만볼트'];
    this.type = '전기';
}

var FirePokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['불 갈기기', '화염방사', '회오리불꽃', '베어가르기'];
    this.type = '불';
}

var WaterPokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['몸통 박치기', '물대포', '냉동빔', '거품광선'];
    this.type = '물';
}

var GrassPokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['씨뿌리기', '덩굴채찍', '울음소리', '몸통 박치기'];
    this.type = '풀';
}

// 각각의 타입을 가지는 포켓몬은 Pokemon을 상속받는다
ElectricPokemon.prototype = new Pokemon();
FirePokemon.prototype = new Pokemon();
WaterPokemon.prototype = new Pokemon();
GrassPokemon.prototype = new Pokemon();

// 포켓몬의 훈련을 위한 운동선언
var 팔운동 = function(pokemon) {
    this.name = pokemon.name;
}
팔운동.prototype.이두컬하기 = function() {
    console.log(this.name + '가 이두컬을 합니다.');
}

var 하체운동 = function(pokemon) {
    this.name = pokemon.name;
}
하체운동.prototype.스쿼트하기 = function() {
    console.log(this.name + '가 스쿼트를 합니다.');
}

var 어깨운동 = function(pokemon) {
    this.name = pokemon.name;
}

어깨운동.prototype.숄더프레스하기 = function() {
    console.log(this.name + '가 숄더프레스를 합니다.');
}

var 가슴운동 = function(pokemon) {
    this.name = pokemon.name;
}

가슴운동.prototype.벤치프레스하기 = function() {
    console.log(this.name + '가 벤치프레스를 합니다.');
}

var 등운동 = function(pokemon) {
    this.name = pokemon.name;
}

등운동.prototype.턱걸이 = function() {
    console.log(this.name + '가 턱걸이를 합니다.');
}


// 훈련장에는 포켓몬들이 들어가 훈련할 수 있고 훈련하는 코드는 보여줄 필요없이 간단한 지시만으로 내부적으로 알아서 처리하기위해 facade패턴을 이용하였다
var 개인훈련장 = (function() {
    function 개인훈련장(pokemon) {
      this.pokemon = pokemon;
      this.팔운동 = new 팔운동(pokemon);
      this.하체운동 = new 하체운동(pokemon);
      this.가슴운동 = new 가슴운동(pokemon);
      this.등운동 = new 등운동(pokemon);
      this.어깨운동 = new 어깨운동(pokemon);
    }

    개인훈련장.prototype.정신력강화하기 = function() {
        console.log('정신력 강화중...---------------------');
        this.pokemon.포켓볼에서나오다();
        this.하체운동.스쿼트하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }

    개인훈련장.prototype.스트렝스훈련하기 = function() {
        console.log('스트렝스 강화중...--------------------');
        this.pokemon.포켓볼에서나오다();
        this.팔운동.이두컬하기();
        this.하체운동.스쿼트하기();
        this.등운동.턱걸이();
        this.pokemon.포켓볼에들어가다();
    }

    개인훈련장.prototype.스킬강화하기 = function() {
        console.log('스킬 강화중...----------------------');
        this.pokemon.포켓볼에서나오다();
        this.어깨운동.숄더프레스하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }
    return 개인훈련장;
  })();

  var 이건준 = new Pokemon('이건준');
  var 이상해씨 = createPokemon('이상해씨', '풀');
  var 파이리 = createPokemon('파이리', '불');
  var 꼬부기 = createPokemon('꼬부기', '물');

  console.log('-----------------훈련장-----------------');
  var 금빛체육관 = new 개인훈련장(이상해씨);
  금빛체육관.정신력강화하기();
  금빛체육관.스트렝스훈련하기();
  금빛체육관.스킬강화하기();
  
  
  console.log('---------------포켓몬 정보---------------');
  이상해씨.who();
  파이리.who();
  꼬부기.who();
  console.log('-------------------------------------');

  드레스(파이리);
  니트(파이리);
  운동화(파이리);
  파이리.wear();



