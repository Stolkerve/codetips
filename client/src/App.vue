<template>
  <v-app>
    <v-app-bar app dark flat dense>
      <TopNavComponent :isLogging="isLogging()" :closeOpenDialogCallback="()=>{showDialog = !showDialog;}"/>
    </v-app-bar>

    <v-main class="mt-6 main-conteiner">
      <CreatePostDialogComponent :dialog="showDialog" :closeOpenDialogCallback="()=>{showDialog = !showDialog}"/>
      <v-container class="main-conteiner mb-12">
        <router-view />
        <DialogComponent/>
      </v-container>

      <BottomNavComponent :isLogging="isLogging()" :closeOpenDialogCallback="()=>{showDialog = !showDialog;}"/>
      <SnackBarComponent/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import SessionModule from "@/store/SessionModule";

import TopNavComponent from "@/components/TopNavComponent.vue"
import BottomNavComponent from "@/components/BottomNavComponent.vue"
import CreatePostDialogComponent from "@/components/CreatePostDialogComponent.vue"
import SnackBarComponent from "@/components/SnackBarComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

@Component({
  components: {
    TopNavComponent,
    BottomNavComponent,
    CreatePostDialogComponent,
    SnackBarComponent,
    DialogComponent
  }
})
export default class App extends Vue {
  sessionModule: SessionModule = getModule(SessionModule);

  showDialog:any = false;

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

  isLogging() {
    return this.sessionModule.session.token;
  }

  created() {
    this.sessionModule.loadSession();
  }
}
</script>

<style>
.main-conteiner {
  background: rgb(94, 93, 93) !important;
  /* background: linear-gradient(
    0deg,
    rgba(94, 93, 93, 1) 2%,
    rgba(45, 45, 45, 1) 100%
  ) !important; */
}

.v-overlay__scrim {
  background: rgb(93, 93, 94) !important;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #2c2c2c;
}

::-webkit-scrollbar-thumb {
  background: rgb(255, 255, 255);
}

.no-background-hover::before {
  background-color: transparent !important;
}

.v-application code {
  background-color: initial !important;
}
</style>