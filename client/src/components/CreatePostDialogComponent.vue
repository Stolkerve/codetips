<template>
  <v-row justify="center">
    <v-dialog
      transition="dialog-bottom-transition"
      :value="dialog"
      width="90%"
      overlay-opacity="1"
      @click:outside="dialogCallback"
    >
      <template v-slot:default>
        <v-card dark>
          <v-card-title class="">Title</v-card-title>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
          >
            <v-responsive class="px-6" max-width="500">
              <v-text-field
                v-model="title"
                :disabled="loading"
                :rules="titleRules"
                maxlength="50"
                dense
                flat
                rounded
                solo-inverted
                @keydown.enter="onSubmit()"
              >
              </v-text-field>
            </v-responsive>

            <v-card-title>Code</v-card-title>
            <v-textarea
              v-model="code"
              class="mx-6"
              :rules="codeRules"
              :disabled="loading"
              height="300"
              full-width
              no-resize
              outlined
              @keydown.enter="onSubmit()"
              @keydown.tab.prevent="handleTab($event)"
            >
            </v-textarea>

            <v-row no-gutters class="mx-4" align="center">
              <v-col cols="auto">
                <v-autocomplete
                  v-model="selectedLanguaje"
                  :disabled="loading"
                  :items="supportedLanguajes"
                  :rules="lenguajesRules"
                  label="languaje"
                  outlined
                >
                </v-autocomplete>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn
                  class="mb-3"
                  color="primary"
                  :disabled="loading"
                  @click="onSubmit()"
                >Post this!</v-btn>
              </v-col>
            </v-row>
            <div v-show="loading">
              <v-progress-linear indeterminate></v-progress-linear>
            </div>
          </v-form>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import PostsServise from "@/services/PostsService"

@Component
export default class CreatePostDialogComponent extends Vue {
  @Prop() dialogCallback!: any;
  @Prop() dialog!: boolean;
  loading: boolean = false;
  validForm: boolean = true;
  
  title: string = "";
  code: string = "";
  selectedLanguaje: string = "";

  supportedLanguajes: string[] = [
    "1c",
    "abnf",
    "accesslog",
    "actionscript",
    "ada",
    "angelscript",
    "apache",
    "applescript",
    "arcade",
    "arduino",
    "armasm",
    "asciidoc",
    "aspectj",
    "autohotkey",
    "autoit",
    "avrasm",
    "awk",
    "axapta",
    "bash",
    "basic",
    "bnf",
    "brainfuck",
    "c",
    "cal",
    "capnproto",
    "ceylon",
    "clean",
    "clojure-repl",
    "clojure",
    "cmake",
    "coffeescript",
    "coq",
    "cos",
    "cpp",
    "crmsh",
    "crystal",
    "csharp",
    "csp",
    "css",
    "d",
    "dart",
    "delphi",
    "diff",
    "django",
    "dns",
    "dockerfile",
    "dos",
    "dsconfig",
    "dts",
    "dust",
    "ebnf",
    "elixir",
    "elm",
    "erb",
    "erlang-repl",
    "erlang",
    "fix",
    "flix",
    "fortran",
    "fsharp",
    "gams",
    "gauss",
    "gcode",
    "gherkin",
    "glsl",
    "gml",
    "go",
    "golo",
    "gradle",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hsp",
    "http",
    "hy",
    "inform7",
    "ini",
    "irpf90",
    "isbl",
    "java",
    "javascript",
    "jboss-cli",
    "json",
    "julia-repl",
    "julia",
    "kotlin",
    "lasso",
    "latex",
    "ldif",
    "leaf",
    "less",
    "lisp",
    "livecodeserver",
    "livescript",
    "llvm",
    "lsl",
    "lua",
    "makefile",
    "markdown",
    "mathematica",
    "matlab",
    "maxima",
    "mel",
    "mercury",
    "mipsasm",
    "mizar",
    "mojolicious",
    "monkey",
    "moonscript",
    "n1ql",
    "nestedtext",
    "nginx",
    "nim",
    "nix",
    "node-repl",
    "nsis",
    "objectivec",
    "ocaml",
    "openscad",
    "oxygene",
    "parser3",
    "perl",
    "pf",
    "pgsql",
    "php-template",
    "php",
    "plaintext",
    "pony",
    "powershell",
    "processing",
    "profile",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "purebasic",
    "python-repl",
    "python",
    "q",
    "qml",
    "r",
    "reasonml",
    "rib",
    "roboconf",
    "routeros",
    "rsl",
    "ruby",
    "ruleslanguage",
    "rust",
    "sas",
    "scala",
    "scheme",
    "scilab",
    "scss",
    "shell",
    "smali",
    "smalltalk",
    "sml",
    "sqf",
    "sql",
    "stan",
    "stata",
    "step21",
    "stylus",
    "subunit",
    "swift",
    "taggerscript",
    "tap",
    "tcl",
    "thrift",
    "tp",
    "twig",
    "typescript",
    "vala",
    "vbnet",
    "vbscript-html",
    "vbscript",
    "verilog",
    "vhdl",
    "vim",
    "wasm",
    "wren",
    "x86asm",
    "xl",
    "xml",
    "xquery",
    "yaml",
    "zephir",
  ];

  titleRules = [
    (v: string) => !!v || 'The title is required.',
  ]

  codeRules = [
    (v: string) => !!v || 'The code is required.',
    (v: string) => (v && v.length <= 50000 )|| 'Max 50000 characters',
  ]

  lenguajesRules = [
    (v: any) => !!v || 'The languaje is required.',
  ]

  handleTab(e: any) {
    if (e) {
      e.preventDefault();
      let startText = this.code.slice(0, e.target.selectionStart);
      let endText = this.code.slice(e.target.selectionStart);
      this.code = `${startText}\t${endText}`;
      e.target.selectionEnd = e.target.selectionStart;
    }
  }

  async onSubmit() {
    if(this.validate()) {
      this.loading = true;
      await PostsServise.createPost(this.title, this.code, this.selectedLanguaje);
      this.loading = false;
      this.dialogCallback();
      this.reset();
    }
  }

  validate() {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  reset() {
    (this.$refs.form as Vue & { reset: () => boolean }).reset();
  }

  resetValidation () {
    (this.$refs.form as Vue & { resetValidation: () => boolean }).resetValidation();
  }
}
</script>