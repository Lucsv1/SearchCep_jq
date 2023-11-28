
    var $jq = jQuery.noConflict()

    $jq(document).ready(function() {

        function limpa_formulário_cep() {
            // Limpa valores do formulário de cep.
            $jq("#form-field-rua").val("");
            $jq("#form-field-bairro").val("");
            $jq("#form-field-cidade").val("");
            $jq("#form-field-uf").val("");
        }
        
        //Quando o campo cep perde o foco.
        $jq("#form-field-cep").blur(function() {

            //Nova variável "cep" somente com dígitos.
            var cep = $jq(this).val().replace(/\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep != "") {

                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if(validacep.test(cep)) {

                    //Preenche os campos com "..." enquanto consulta webservice.
                    $jq("#form-field-rua").val("...");
                    $jq("#form-field-bairro").val("...");
                    $jq("#form-field-cidade").val("...");
                    $jq("#form-field-uf").val("...");

                    //Consulta o webservice viacep.com.br/
                    $jq.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            $jq("#form-field-rua").val(dados.logradouro);
                            $jq("#form-field-bairro").val(dados.bairro);
                            $jq("#form-field-cidade").val(dados.localidade);
                            $jq("#form-field-uf").val(dados.uf);
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            alert("CEP não encontrado.");
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });
    });

