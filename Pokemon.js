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

Pokemon.prototype.걷다 = function() {
    console.log(this.name + '가 걷습니다.');
}

Pokemon.prototype.뛰다 = function() {
    console.log(this.name + '가 뜁니다.');
}

Pokemon.prototype.공격하다 = function() {
    var randomIndex = Math.ceil(Math.random() * 3) // 배열의 인덱스이므로 3이하인 인덱스를 랜덤으로 뽑아낸다
    console.log(this.name + '가 ' + '[' +this.skill[randomIndex] + ']를 시전합니다.');
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



// 훈련장에는 포켓몬들이 들어가 훈련할 수 있고 훈련하는 코드는 보여줄 필요없이 간단한 지시만으로 내부적으로 알아서 처리하기위해 facade패턴을 이용하였다
var 훈련장 = (function() {
    function 훈련장() {
      this.pokemons = Array.from(arguments);;
    }

    훈련장.prototype.walk = function() {
      this.pokemons.forEach(function(pokemon) {
        pokemon.포켓볼에서나오다();
        pokemon.걷다();
        pokemon.포켓볼에들어가다();
      });
    };
    훈련장.prototype.run = function() {
      this.pokemons.forEach(function(pokemon) {
        pokemon.포켓볼에서나오다();
        pokemon.뛰다();
        pokemon.포켓볼에들어가다();
      });
    };
    훈련장.prototype.attack = function() {
      this.pokemons.forEach(function(pokemon) {
        pokemon.포켓볼에서나오다();
        pokemon.공격하다();
        pokemon.포켓볼에들어가다();
      });
    };
    return 훈련장;
  })();

  var 이건준 = new Pokemon('이건준');
  var 이상해씨 = createPokemon('이상해씨', '풀');
  var 파이리 = createPokemon('파이리', '불');
  var 꼬부기 = createPokemon('꼬부기', '물');

  console.log('-----------------훈련장-----------------');
  var 리오넬시티 = new 훈련장(이상해씨, 파이리, 꼬부기);
  리오넬시티.attack();
  리오넬시티.walk();
  리오넬시티.run();
  
  console.log('---------------포켓몬 정보---------------');
  이상해씨.who();
  파이리.who();
  꼬부기.who();
  console.log('-------------------------------------');

