var Pokemon = function(name) {
    this.name = name;
    this.type = '무속성';
    this.skill = ['삐지기', '도망가기', '지침', '잠자기']; // 타입을 가지고있지않은 포켓몬을 생성할 경우 아무런 능력을 가지지못합니다
    this.cost = function() { // 어떤 타입이냐에 따라서 포켓몬의 가치가 달라지게된다, 타입이 존재하지않은 경우는 0
        return 0;
    }
}

Pokemon.createPokemon = function(name, type) { // 타입마다 다른 포켓몬을 생성해야하므로 팩토리패턴을 이용해주었다
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

Pokemon.prototype.who = function() {
    console.log('[' + this.name + ']는 ' + this.type + '타입이고 [' + this.skill + '] 스킬을 사용할 수 있습니다.');
}

Pokemon.prototype.포켓볼에서나오다 = function() {
    console.log('[' + this.name + ']가 포켓볼에서 나왔습니다.');
}

Pokemon.prototype.포켓볼에들어가다 = function() {
    console.log('[' + this.name + ']가 포켓볼에 들어갔습니다.');
}

// 포켓몬에 진화의돌을 부여할 수 있도록 구매가능하고 원하는것을 자유롭게 구매할 수 있도록 Decorator패턴을 이용해보았습니다
var 불꽃의돌 = function(pokemon) {
    var cost = pokemon.cost();
    pokemon.cost = function() {
        console.log('[' + pokemon.name + ']가 [불꽃의 돌]을 구매하였습니다.');
        return cost + 100;
    }
}

var 물의돌 = function(pokemon) {
    var cost = pokemon.cost();
    pokemon.cost = function() {
        console.log('[' + pokemon.name + ']가 [물의 돌]을 구매하였습니다.');
        return cost + 100;
    }
}

var 천둥의돌 = function(pokemon) {
    var cost = pokemon.cost();
    pokemon.cost = function() {
        console.log('[' + pokemon.name + ']가 [천둥의 돌]을 구매하였습니다.');
        return cost + 100;
    }
}

var ElectricPokemon = function(name) {
    Pokemon.call(this); // 부모인 Pokemon을 불러 초기화시켜준다
    this.name = name;
    this.skill = ['백만볼트', '번개후리기', '전광석화', '천만볼트'];
    this.type = '전기';
    this.cost = function() {
        return 100;
    }
}

var FirePokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['불 갈기기', '화염방사', '회오리불꽃', '베어가르기'];
    this.type = '불';
    this.cost = function() {
        return 200;
    }
}

var WaterPokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['몸통 박치기', '물대포', '냉동빔', '거품광선'];
    this.type = '물';
    this.cost = function() {
        return 300;
    }
}

var GrassPokemon = function(name) {
    Pokemon.call(this);
    this.name = name;
    this.skill = ['씨뿌리기', '덩굴채찍', '울음소리', '몸통 박치기'];
    this.type = '풀';
    this.cost = function() {
        return 400;
    }
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
    console.log('[' + this.name + ']가 이두컬을 합니다.');
}

var 하체운동 = function(pokemon) {
    this.name = pokemon.name;
}
하체운동.prototype.스쿼트하기 = function() {
    console.log('[' + this.name + ']가 스쿼트를 합니다.');
}

var 어깨운동 = function(pokemon) {
    this.name = pokemon.name;
}

어깨운동.prototype.숄더프레스하기 = function() {
    console.log('[' + this.name + ']가 숄더프레스를 합니다.');
}

var 가슴운동 = function(pokemon) {
    this.name = pokemon.name;
}

가슴운동.prototype.벤치프레스하기 = function() {
    console.log('[' + this.name + ']가 벤치프레스를 합니다.');
}

var 등운동 = function(pokemon) {
    this.name = pokemon.name;
}

등운동.prototype.턱걸이 = function() {
    console.log('[' + this.name + ']가 턱걸이를 합니다.');
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
        console.log('정신력 강화중...');
        this.pokemon.포켓볼에서나오다();
        this.하체운동.스쿼트하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }

    개인훈련장.prototype.스트렝스훈련하기 = function() {
        console.log('스트렝스 강화중...');
        this.pokemon.포켓볼에서나오다();
        this.팔운동.이두컬하기();
        this.하체운동.스쿼트하기();
        this.등운동.턱걸이();
        this.pokemon.포켓볼에들어가다();
    }

    개인훈련장.prototype.스킬강화하기 = function() {
        console.log('스킬 강화중...');
        this.pokemon.포켓볼에서나오다();
        this.어깨운동.숄더프레스하기();
        this.가슴운동.벤치프레스하기();
        this.pokemon.포켓볼에들어가다();
    }
    return 개인훈련장;
  })();

  // 포켓몬의 진화를 하는 과정을 위해 템플릿패턴으로 구현
  var Evolution = function(pokemon) {
      this.pokemon = pokemon;
      this.진화하다 = function() {
        this.정신집중하다();
        this.진화의돌을사용하다();
        this.궁극체포켓몬으로변하다();
      }

      this.정신집중하다 = function() {
        console.log('[' + this.pokemon.name + ']가 정신을 집중하는중입니다.');
      }

      this.진화의돌을사용하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [진화의 돌]을 사용합니다.');
      }

      this.궁극체포켓몬으로변하다 = function() {
        console.log('[' + this.pokemon.name + ']가 궁극체포켓몬으로 변합니다.');
      }
  }

  var FireEvolution = function(pokemon) {
      Evolution.call(this);
      this.pokemon = pokemon;
      this.진화의돌을사용하다 = function() {
          console.log('[' + this.pokemon.name + ']가 [불꽃의 돌]을 사용합니다.');
      }

      this.궁극체포켓몬으로변하다 = function() {
          console.log('[' + this.pokemon.name + ']가 [리자몽]으로 진화합니다.');
      }
  }

  var WaterEvolution = function(pokemon) {
      Evolution.call(this);
      this.pokemon = pokemon;
      this.진화의돌을사용하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [물의 돌]을 사용합니다.');
      }

      this.궁극체포켓몬으로변하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [거북왕]으로 진화합니다.');
      }
  }

  var GrassEvolution = function(pokemon) {
      Evolution.call(this);
      this.pokemon = pokemon;
      this.진화의돌을사용하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [풀의 돌]을 사용합니다.');
      }

      this.궁극체포켓몬으로변하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [이상해꽃]으로 진화합니다.');
      }
  }

  var ElectricEvolution = function(pokemon) {
      Evolution.call(this);
      this.pokemon = pokemon;
      this.진화의돌을사용하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [천둥의 돌]을 사용합니다.');
      }

      this.궁극체포켓몬으로변하다 = function() {
        console.log('[' + this.pokemon.name + ']가 [라이츄]으로 진화합니다.');
      }
  }

  FireEvolution.prototype = new Evolution();
  WaterEvolution.prototype = new Evolution();
  GrassEvolution.prototype = new Evolution();
  ElectricEvolution.prototype = new Evolution();

  var 피카츄 = Pokemon.createPokemon('피카츄', '전기');
  var 이상해씨 = Pokemon.createPokemon('이상해씨', '풀');
  var 파이리 = Pokemon.createPokemon('파이리', '불');
  var 꼬부기 = Pokemon.createPokemon('꼬부기', '물');

  console.log('---------------포켓몬 정보---------------');
  이상해씨.who();
  파이리.who();
  꼬부기.who();
  피카츄.who();
  console.log('-----------------훈련장-----------------');
  var 금빛체육관 = new 개인훈련장(이상해씨);
  금빛체육관.정신력강화하기();
  금빛체육관.스트렝스훈련하기();
  금빛체육관.스킬강화하기();
  console.log('-------------------------------------');

불꽃의돌(파이리);
물의돌(파이리);
천둥의돌(파이리);
console.log('구매한 총 가격: ' + 파이리.cost()+' Gold');
console.log('---------------포켓몬 진화---------------');
var 파이리진화 = new FireEvolution(파이리);
var 꼬부기진화 = new WaterEvolution(꼬부기);
var 이상해씨진화 = new GrassEvolution(이상해씨);
var 피카츄진화 = new ElectricEvolution(피카츄);

console.log('[파이리] -> [리자몽]');
파이리진화.진화하다();
console.log('[꼬부기] -> [거북왕]');
꼬부기진화.진화하다();
console.log('[이상해씨] -> [이상해꽃]');
이상해씨진화.진화하다();
console.log('[피카츄] -> [라이츄]');
피카츄진화.진화하다();



