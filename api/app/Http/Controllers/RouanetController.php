<?php

namespace App\Http\Controllers;

use NumberFormatter;
use App\Models\Rouanet;

class RouanetController extends Controller
{
    public function index()
    {
        $project = Rouanet::all();

        return response()->json([
            'project' => $project->map(function ($resp) {
                $formatter = new NumberFormatter('pt_BR', NumberFormatter::CURRENCY);

                return [
                    'status'=>200,
                    'pronac'  =>  $resp->pronac,
                    'ano_projeto'  =>  $resp->ano_projeto,
                    'nome' =>  $resp->nome,
                    'segmento' =>  $resp->segmento,
                    'area' =>  $resp->area,
                    'uf' =>  $resp->uf,
                    'municipio' =>  $resp->municipio,
                    'data_inicio' =>  $resp->data_inicio->format("d/m/Y H:i:s"),
                    'data_termino' =>  $resp->data_termino ->format("d/m/Y H:i:s"),
                    'situacao' =>  $resp->situacao,
                    'mecanismo' =>  $resp->mecanismo,
                    'enquadramento' =>  $resp->enquadramento,
                    'valor_captado' => $formatter->formatCurrency($resp->valor_captado, 'BRL'),
                    'valor_aprovado' => $formatter->formatCurrency($resp->valor_aprovado, 'BRL'),
                    'acessibilidade' =>  $resp->acessibilidade,
                    'objetivos' =>  $resp->objetivos,
                    'justificativa' =>  $resp->justificativa,
                    'etapa' =>  $resp->etapa,
                    'ficha_tecnica' =>  $resp->ficha_tecnica,
                    'impacto_ambiental' =>  $resp->impacto_ambiental,
                    'especificacao_tecnica' =>  $resp->especificacao_tecnica,
                    'providencia' =>  $resp->providencia,
                    'democratizacao' =>  $resp->democratizacao,
                    'sinopse' =>  $resp->sinopse,
                    'resumo' =>  $resp->resumo,
                    'valor_projeto' =>  $resp->valor_projeto,
                    'outras_fontes' =>  $resp->outras_fontes,
                    'valor_proposta' =>  $resp->valor_proposta,
                    'valor_solicitado' =>  $resp->valor_solicitado,
                    'objetivo' =>  $resp->objetivo,
                    'estrategia_execucao' =>  $resp->estrategia_execucao,
                    'link_incentivadores' =>  $resp->link_incentivadores
                ];
            }),
        ]);

    }
}
