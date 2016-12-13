var input = `cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 16 c
cpy 17 d
inc a
dec d
jnz d -2
dec c
jnz c -5`;

class Processor {
    constructor(instructions) {
        this.registers = {
            a: 0,
            b: 0,
            c: 1,
            d: 0,
        };

        this.instructionPoiner = 0;
        this.instructions = instructions;
    }

    process() {
        while (this.instructionPoiner < this.instructions.length) {
            this.instructionPoiner += this.instructions[this.instructionPoiner](this.registers);
        }

        return this;
    }
}

function createProgram(input) {
    var instructions = input.split('\n')
            .map(line => {
                var match;

                if ((match = (/cpy ([a-d]) ([a-d])/).exec(line)) !== null) {
                    return (registers) => {
                        registers[match[2]] = registers[match[1]];
                        return 1;
                    };
                } else if ((match = (/cpy (-?\d+) ([a-d])/).exec(line)) !== null) {
                    return (registers) => {
                        registers[match[2]] = +match[1];
                        return 1;
                    };
                } else if ((match = (/inc ([a-d])/).exec(line)) !== null) {
                    return (registers) => {
                        registers[match[1]]++;
                        return 1;
                    };
                } else if ((match = (/dec ([a-d])/).exec(line)) !== null) {
                    return (registers) => {
                        registers[match[1]]--;
                        return 1;
                    };
                } else if ((match = (/jnz ([a-d]) (-?\d+)/).exec(line)) !== null) {
                    return (registers) => {
                        return registers[match[1]] !== 0 ? +match[2] : 1;
                    }
                }  else if ((match = (/jnz (-?\d+) (-?\d+)/).exec(line)) !== null) {
                    return (registers) => {
                        return +match[1] !== 0 ? +match[2] : 1;
                    }
                } else {
                    throw new Error(`Failed to parse instruction: ${line}`);
                }
            });

    return new Processor(instructions);
}


console.log(createProgram(input).process().registers.a);